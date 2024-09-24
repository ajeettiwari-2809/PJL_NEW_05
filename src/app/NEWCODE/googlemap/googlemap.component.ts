import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})
export class GooglemapComponent implements OnInit ,OnChanges,AfterViewInit{


  @ViewChild('stationsTimeline') stationsTimeline!: ElementRef;

  map!: google.maps.Map;

  allTransitDetails:any[]=[];
  baseUrl:String = this.authservice.baseUrl;

  locations = [
    { lat: 24.5700754, lng: 80.998720, label: 'Start' },
    { lat: 24.579716, lng: 80.832176, label: 'Cross', description: 'Description of the crossing point.' },
    { lat: 25.063442, lng: 81.093607, label: 'Current' },
    { lat: 25.445871, lng: 81.828446, label: 'End' }
  ];
  fnrid:any;

  truckMarker!: google.maps.Marker;
  lastUpdatedTime1!: Date;
  timeAgo!: string;

  directionsService = new google.maps.DirectionsService(); // To calculate routes
  directionsRenderer = new google.maps.DirectionsRenderer(); // T
  infoWindow: any;
  constructor(private authservice:AuthService,private http: HttpClient,private spinner: NgxSpinnerService,private router: Router,private route: ActivatedRoute,) {

    this.lastUpdatedTime1 = new Date();
    this.updateTimeAgo();

    // Set an interval to refresh the "time ago" every minute (60000 ms)
    setInterval(() => {
      this.updateTimeAgo();

      console.log("! mi");
    }, 60000); // Every 1 minute

    // Set an interval to refresh the entire update (e.g., fetching new data) every 10 minutes
    setInterval(() => {
      this.refreshTime();
    }, 600000); // Every 10 minutes
    }
  viewMode: string = 'map';


  ngAfterViewInit() {
    // Scroll to the bottom after the view is initialized
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.stationsTimeline.nativeElement.scrollTop = this.stationsTimeline.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }


  fnrNumber:any;
  stationFrom:any;
  stationTo:any;
  currentLocation:any;

  ngOnInit(): void {

    this.fnrid= this.route.snapshot.params['id'];

    if (this.viewMode === 'map') {
      // this.initMap();
    }
    this.startLocationUpdate();

    this.getFNRTransitDetails();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        this.refreshComponent();
      }
    });
  }

  refreshComponent()
  {
    window.location.reload();
  }


getFNRTransitDetails()
{
  // allTransitDetails

 this.spinner.show();

   const apiUrl=this.baseUrl+ 'Users/getFOIS_List_Admin_Rack_Track_ById';

   this.http.post(apiUrl, { "input": this.fnrid,
    "inputString":'' }).subscribe((data: any) => {
    this.spinner.hide();

    this.allTransitDetails=data;
    this.fnrNumber=this.allTransitDetails[0]['fnrNo'];
    this.stationFrom=this.allTransitDetails[0]['stationFrom'];
    this.stationTo=this.allTransitDetails[0]['stationTo'];
    this.currentLocation=this.allTransitDetails[this.allTransitDetails.length-1]['lastRepLocn'];

    // this.processData();
    console.log(this.allTransitDetails);
    this.initializeMap();

  });
}


  ngOnChanges(): void {
    if (this.viewMode === 'map') {
      // Delay the map initialization slightly to ensure the DOM is rendered
      setTimeout(() => this.initMap(), 100);
    }
  }

  initMap(): void {

    const mapOptions: google.maps.MapOptions = {
      center: { lat: this.locations[2].lat, lng: this.locations[2].lng },
      zoom: 16
    };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    this.locations.forEach((location, index) => {
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: this.map,
        label: location.label,
        zIndex:1,
        icon: index === 2 ? {
          url: 'https://static.thenounproject.com/png/335079-200.png',
          scaledSize: new google.maps.Size(40, 40)
        } : undefined
      });

      if (index === 2) {
        this.truckMarker = marker;
        this.addBlinkingEffect(marker);
      }

      if (location.description) {
        const infoWindow = new google.maps.InfoWindow({
          content: `<div>${location.description}</div>`
        });

        marker.addListener('click', () => {
          infoWindow.open(this.map, marker);
        });
      }
    });

    this.calculateAndDisplayRoute();
  }

  calculateAndDisplayRoute(): void {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(this.map);

    const waypoints = this.locations.slice(1, -1).map(location => ({
      location: new google.maps.LatLng(location.lat, location.lng),
      stopover: true
    }));

    directionsService.route({
      origin: new google.maps.LatLng(this.locations[0].lat, this.locations[0].lng),
      destination: new google.maps.LatLng(this.locations[this.locations.length - 1].lat, this.locations[this.locations.length - 1].lng),
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(response);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  }

  addBlinkingEffect(marker: google.maps.Marker): void {
    const overlay = new google.maps.OverlayView();

    overlay.onAdd = function() {
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.width = '40px';
      div.style.height = '40px';
      div.style.backgroundImage = 'url(https://via.placeholder.com/40)';
      div.style.backgroundSize = 'contain';
      div.classList.add('blinking-marker');

      const panes = this.getPanes();
      if (panes && panes.overlayLayer) {
        panes.overlayLayer.appendChild(div);
      }

      overlay.draw = function() {
        const projection = this.getProjection();
        const position = marker.getPosition();
        if (position && projection) {
          const point = projection.fromLatLngToDivPixel(position);
          if (point) {
            div.style.left = `${point.x - 20}px`;
            div.style.top = `${point.y - 20}px`;
          }
        }
      };
    };

    overlay.setMap(marker.getMap());
  }

  getBack()
  {
    window.history.back();
  }


  trainNumber = '13238 - Kota - Patna Express';
  currentDate = new Date().toLocaleDateString();
  stations = [
    { name: 'Buxar', distance: 1061, platform: 1, arrival: '5:01 PM', departure: '5:05 PM' },
    { name: 'Dumraon', distance: 1117, platform: 2, arrival: '5:12 PM', departure: '5:20 PM' },
    { name: 'Ara Junction', distance: 1229, platform: 1, arrival: '5:54 PM', departure: '5:57 PM' },
    { name: 'Bihia', distance: 1240, platform: 2, arrival: '6:10 PM', departure: '6:12 PM' },
    { name: 'Danapur', distance: 1288, platform: 4, arrival: '6:40 PM', departure: 'ADD' }
  ];

  currentStationIndex = 2; // Initial current location index
  lastUpdatedTime = 'few seconds';


  startLocationUpdate() {
    setInterval(() => {
      this.currentStationIndex = (this.currentStationIndex + 1) % this.stations.length;
      this.lastUpdatedTime = 'just now'; // You can improve this with real-time calculation
    }, 600000); // Update every 10 minutes
  }


  refreshTime() {
    window.location.reload();
    this.lastUpdatedTime1 = new Date();
    this.updateTimeAgo();
  }



  updateTimeAgo() {

   const currentTime = new Date().getTime();
    const timeDiff = currentTime - this.lastUpdatedTime1.getTime();
    const minutes = Math.floor(timeDiff / 60000);

    if (minutes === 0) {
      this.timeAgo = `just now`;
    } else {
      this.timeAgo = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
  }








  initializeMap2() {
    const mapOptions = {
      zoom: 6,
      center: { lat: this.allTransitDetails[0].sourceLat, lng: this.allTransitDetails[0].sourcLong },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: 'landscape.natural',
          stylers: [{ visibility: 'off' }]  // Hide greenery
        },
        {
          featureType: 'water',
          stylers: [{ visibility: 'off' }]  // Hide water
        },
        {
          featureType: 'road.highway',
          stylers: [{ visibility: 'off' }]  // Hide highways (NH)
        }
      ]
    };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
    this.directionsRenderer.setMap(this.map);

    // Add source and destination markers
    this.addMarker2({ lat: this.allTransitDetails[0].sourceLat, lng: this.allTransitDetails[0].sourcLong });
    this.addMarker2({ lat: this.allTransitDetails[0].destinationLat, lng: this.allTransitDetails[0].destinationLong, });

    // Calculate and display the route with all current locations as waypoints
    this.calculateAndDisplayRouteWithWaypoints();
  }

  calculateAndDisplayRouteWithWaypoints2() {
    const source = {
      lat: this.allTransitDetails[0].sourceLat,
      lng: this.allTransitDetails[0].sourcLong
    };

    const destination = {
      lat: this.allTransitDetails[0].destinationLat,
      lng: this.allTransitDetails[0].destinationLong
    };

    // Collect all current locations as waypoints (excluding the first and last location)
    const waypoints = this.allTransitDetails.map((train) => ({
      location: { lat: train.currentLat, lng: train.currentLong },
      stopover: true
    }));

    const routeRequest = {
      origin: source, // Starting point
      destination: destination, // End point
      waypoints: waypoints, // All current locations as waypoints
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(routeRequest, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(result);
      } else {
        console.error('Could not display directions due to: ' + status);
      }
    });
  }

  addMarker2(position: google.maps.LatLngLiteral) {
    return new google.maps.Marker({
      position,
      map: this.map,
      // title: position.title
    });
  }



  initializeMap() {
    const mapOptions = {
      zoom: 6,
      center: { lat: this.allTransitDetails[0].sourceLat, lng: this.allTransitDetails[0].sourcLong },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: 'landscape.natural',
          stylers: [{ visibility: 'off' }]  // Hide greenery
        },
        {
          featureType: 'water',
          stylers: [{ visibility: 'off' }]  // Hide water
        },
        {
          featureType: 'road.highway',
          stylers: [{ visibility: 'off' }]  // Hide highways (NH)
        }
      ]
    };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
    this.directionsRenderer.setMap(this.map);

    // Add source and destination markers
    this.addMarker({ lat: this.allTransitDetails[0].sourceLat, lng: this.allTransitDetails[0].sourcLong, title:  'Last Location (Blinking)' ,
      isLast: false});

    this.addMarker({ lat: this.allTransitDetails[0].destinationLat, lng: this.allTransitDetails[0].destinationLong , title: 'Last Location (Blinking)',
      isLast: false});

    // Add markers for all current locations
    this.addCurrentLocationMarkers();

    // Calculate and display the route with all current locations as waypoints
    this.calculateAndDisplayRouteWithWaypoints();
  }

  addCurrentLocationMarkers() {
    const lastIndex = this.allTransitDetails.length - 1;

    // Loop through all current locations and add custom markers ///  currentStatus
    this.allTransitDetails.forEach((train, index) => {
      const isLast = index === lastIndex;

      this.addMarker({
        lat: train.currentLat,
        lng: train.currentLong,
        title: !isLast ? train.currentStatus : 'Current Location:  ' + train.currentStatus,
        isLast: isLast
      });
    });
  }

  addMarker(position: { lat: number, lng: number, title: string, isLast: boolean }) {
    const customIcon: google.maps.Symbol = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8, // Adjust the size of the circle
      fillColor: 'yellow',
      fillOpacity: 1,
      strokeColor: 'yellow',
      strokeWeight: 1
    };

    const markerOptions: google.maps.MarkerOptions = {
      position: { lat: position.lat, lng: position.lng },
      map: this.map,
      title: position.title,
      icon: customIcon,  // Use only the custom yellow circle icon
    };

    const marker = new google.maps.Marker(markerOptions);

    if (position.isLast) {
      // Add blinking effect to the last marker (current location)
      this.applyBlinkingEffect(marker);
    }
  }

  applyBlinkingEffect(marker: google.maps.Marker) {
    const markerElement = marker.getIcon() as google.maps.Symbol;

    const customIcon1: google.maps.Symbol = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8, // Adjust the size of the circle
      fillColor: 'red',
      fillOpacity: 1,
      strokeColor: 'red',
      strokeWeight: 1
    };

    if (customIcon1) {
      customIcon1.fillOpacity = 0.5;
      marker.setIcon(customIcon1);
    }

    const blinkInterval = setInterval(() => {
      const currentIcon = marker.getIcon() as google.maps.Symbol;
      const customIcon12: google.maps.Symbol = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8, // Adjust the size of the circle
        fillColor: 'red',
        fillOpacity: 1,
        strokeColor: 'red',
        strokeWeight: 1
      };
      if (currentIcon.fillOpacity === 0.5) {
        currentIcon.fillOpacity = 1;
      } else {
        currentIcon.fillOpacity = 0.5;
      }
      marker.setIcon(currentIcon);
    }, 500); // Blinking every 500 milliseconds
  }

  calculateAndDisplayRouteWithWaypoints() {
    const source = {
      lat: this.allTransitDetails[0].sourceLat,
      lng: this.allTransitDetails[0].sourcLong
    };

    const destination = {
      lat: this.allTransitDetails[0].destinationLat,
      lng: this.allTransitDetails[0].destinationLong
    };

    const waypoints = this.allTransitDetails.map((train) => ({
      location: { lat: train.currentLat, lng: train.currentLong },
      stopover: true
    }));


    const routeRequest = {
      origin: source,
      destination: destination,
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsRenderer.setOptions({
      suppressMarkers: true
    });

    this.directionsService.route(routeRequest, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {


        this.directionsRenderer.setDirections(result);

        this.addCustomMarker(source, 'Source', 'yellow');
        this.addCustomMarker(destination, 'Destination', 'yellow');


        this.addMarkerClickListener(waypoints);






      } else {
        console.error('Could not display directions due to: ' + status);
      }
    });
  }

  addMarkerClickListener(data:any) {

console.log("opdnjksnn")
    data.addListener('click', () => {


      // this.infoWindow.setContent(`<div><strong>ID:</strong> ${path.id}</div>`);
      this.infoWindow.setContent(`
        <div>

          <strong>Destination Latitude:</strong> ${data.destination['lat']}<br>
          <strong>Destination Longitude:</strong> ${data.destination.lng}<br>

        </div>
      `);


      this.infoWindow.open(data);

    });
  }
  navigateToDetail(id: any) {
    throw new Error('Method not implemented.');
  }
  addCustomMarker(position: google.maps.LatLngLiteral, title: string, color: string) {
    new google.maps.Marker({
      position: position,
      map: this.map,
      title: title,
      icon: title=='Source'? {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: color,
        fillOpacity: 1.0,
        strokeColor: 'black',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        scale: 8
      }:{
        url: 'assets/pjlphotos/D6.png',
      scaledSize: new google.maps.Size(80, 40),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(40, 40)
      }


    });
  }

}
