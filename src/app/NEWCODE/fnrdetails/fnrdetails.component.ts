import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

declare const google: any;
@Component({
  selector: 'app-fnrdetails',
  templateUrl: './fnrdetails.component.html',
  styleUrls: ['./fnrdetails.component.css']
})
export class FNRDETAILSComponent implements OnInit, OnDestroy{

constructor(private authservice:AuthService,private http: HttpClient,private spinner: NgxSpinnerService,private router: Router,private route: ActivatedRoute,)
{}
VehicleType:any=[];

zonecode?:String;
radiobuttonActive!:string;
viewMode: string = 'map';
zoneName:string='';
map: any;
directionsService: any;
records: any[] = [];
records1: any[] = [];
infoWindow: any;
highlightedRoute: any;

  ngOnInit(): void {

    this.zonecode= this.route.snapshot.params['id'];
    console.log(this.zonecode);
    this.loadMap();
    this.getRecord();
    this.radiobuttonActive='0';

this.setZoneDetails();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        this.refreshComponent();
      }
    });
  }

  setZoneDetails()
  {
    if(this.zonecode=='CUP')
    {
      this.zoneName='CENTRAL UP'
    }
   else if(this.zonecode=='MP')
      {
        this.zoneName='Madhya PRADESH'
      }
      else if(this.zonecode=='BH')
        {
          this.zoneName='BIHAR'
        }
        else
        {
          this.zoneName='EASTERN UP'
        }


  }

  refreshComponent()
  {
    window.location.reload();
  }
   baseUrl:String = this.authservice.baseUrl;
  filteredRecords:any[]=[];


  @ViewChild('map') mapContainer!: ElementRef;


  ngAfterViewInit() {
    // Initialize map only after the view has been initialized and the element is available
    if (this.viewMode === 'details') {
      this.loadMap();
    }
  }


  getRecord()
  {

    this.spinner.show();
   const apiUrl=this.baseUrl+ 'Users/getFOIS_DetailByZone';

   this.http.post(apiUrl, { "input": 0,
    "inputString":this.zonecode }).subscribe((data: any) => {
    this.spinner.hide();

    this.filteredRecords=data;

    this.processData();

  });


  }
  loadMap() {
    const mapOptions = {
      zoom: 7,
      center: { lat: 24.579716, lng: 80.832176 },
      styles: [
        {
          featureType: "road.highway", // Hide highways (NH)
          elementType: "geometry",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "road.highway", // Hide NH names (labels)
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "landscape.natural", // Hide green background (vegetation)
          elementType: "geometry",
          stylers: [{ visibility: "off" }]
        },
        // {
        //   featureType: "landscape.protected_land", // Hide national parks
        //   elementType: "geometry",
        //   stylers: [{ visibility: "off" }]
        // },
        {
          featureType: "poi.park", // Hide parks (points of interest)
          elementType: "geometry",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "water", // Hide rivers and water bodies
          elementType: "geometry",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "poi", // Hide all points of interest
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "transit", // Hide transit features like bus stops and stations
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    };

    this.map = new google.maps.Map(document.getElementById('map')!, mapOptions);
    this.directionsService = new google.maps.DirectionsService();
    this.infoWindow = new google.maps.InfoWindow();
  }


  processData() {
    const sourceMap: { [key: string]: any[] } = {};

    this.filteredRecords.forEach(record => {
      const sourceKey = `${record.sourceLat},${record.sourcLong}`;
console.log("Source key "+ sourceKey);

      if (!sourceMap[sourceKey]) {
        sourceMap[sourceKey] = [];
      }
      sourceMap[sourceKey].push(record);
    });



    // end
    Object.keys(sourceMap).forEach(sourceKey => {
      const records = sourceMap[sourceKey];
      console.log("source" + records);
      const source = {
        lat: records[0].sourceLat,
        lng: records[0].sourcLong
      };

      //  records.forEach(record => {
      //   this.createZoneCircle(record);
      // });

      records.forEach(record => {
        const path = {
          source: source,
          destination: { lat: record.destinationLat, lng: record.destinationLong },
          current: { lat: record.currentLat, lng: record.currentLong },
          color: this.getColorForRecord(record),
          customerName: record.customerName, // Add customer name
          customerLogo: record.customerLogo, // Add customer logo
          lastRepLocn: record.lastRepLocn,
          id: record.id,
          alldata:record
        };

        this.addMarkers(path);
        this.plotRoute(path);
      });
    });
  }

  getColorForRecord(record: any): string {
    console.log('zone cide '+ record['zoneCode'])
    switch (record['zoneCode']) {
      case 'CUP': return 'purple';
      case 'MP': return 'blue';
      case 'BH': return 'yellow';
      case 'EUP': return 'red';
      default: return 'red';
    }
  }

  plotRoute(path: any) {
    const directionsRenderer = new google.maps.DirectionsRenderer({
      map: this.map,
      polylineOptions: { strokeColor: path.color }
    });

    const request = {
      origin: path.source,
      destination: path.destination,
      waypoints: [{ location: path.current, stopover: true }],
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsRenderer.setOptions({
      suppressMarkers: true
    });

    this.directionsService.route(request, (result: any, status: any) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);


        this.highlightedRoute = directionsRenderer;

      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  }

  addMarkers(path: any) {
    // Source marker with customer logo
    const sourceMarker = new google.maps.Marker({
      position: path.source,
      map: this.map,
      icon: {

        url: 'assets/pjlphotos/D6.png',
        scaledSize: new google.maps.Size(80, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(40, 40)
      },
      zIndex: 700,
      // label: { text: path.customerName, color: 'blue', fontSize: '16px' } // Use customer name
    });

    // Destination marker
    const destinationMarker = new google.maps.Marker({
      position: path.destination,
      map: this.map,
      icon: {
        url: 'assets/pjlphotos/mapdestinationicon.png',
        scaledSize: new google.maps.Size(80, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(40,40)
      },

      zIndex: 700,
      // visible: false,
    });

    // Current location marker with blinking effect
    this.addBlinkingMarker(path.current, path.lastRepLocn);

    // Add click listeners to markers
    this.addMarkerClickListener(sourceMarker, path);
    this.addMarkerClickListener(destinationMarker, path);
  }
  addBlinkingMarker1(position: google.maps.LatLngLiteral, lastRepLocn: string) {
    const marker = new google.maps.Marker({
      position: position,
      map: this.map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: 'yellow',
        fillOpacity: 1,
        strokeColor: 'yellow',
        strokeWeight: 1,
        animation: google.maps.Animation.BOUNCE,

      },
      label: { text: lastRepLocn, color: 'blue', fontSize: '16px' }
    });

    setInterval(() => {
      marker.setIcon(marker.getIcon().fillColor === 'yellow' ? {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: 'red',
        fillOpacity: 1,
        strokeColor: 'red',
        strokeWeight: 1,
        animation: google.maps.Animation.BOUNCE
      } : {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: 'yellow',
        fillOpacity: 1,
        strokeColor: 'yellow',
        strokeWeight: 1,
        animation: google.maps.Animation.BOUNCE
      });
    }, 500);
  }

  addBlinkingMarker(position: google.maps.LatLngLiteral, lastRepLocn: string) {
    // Define the initial marker options with a custom icon
    const marker = new google.maps.Marker({
      position: position,
      map: this.map,
      icon: {
        // url: 'assets/pjlphotos/currentlocation.png',  // Custom icon URL
        scaledSize: new google.maps.Size(80,40),  // Custom size for the icon
        anchor: new google.maps.Point(80, 40)      // Anchor point to position icon correctly
      },
      zIndex: 700,
      label:null,
      // label: {
      //   text: lastRepLocn,
      //   color: 'blue',
      //   fontSize: '16px',
      //   fontWeight: 'bold'  // Customize font properties
      // },
      animation: google.maps.Animation.BOUNCE  // Adds bounce animation
    });

    // Blinking effect by changing the icon's color or toggling visibility
    setInterval(() => {
      const currentIcon = marker.getIcon() as google.maps.Icon | google.maps.Symbol | null;

      // Toggle between two icon styles (yellow and red colors)
      if ( currentIcon && 'url' in currentIcon) {  // Check if the current icon has a URL (custom icon)
        marker.setIcon(currentIcon.url === 'assets/pjlphotos/currentlocation.png'
          ? {
              url: 'assets/pjlphotos/currentlocation.png',
              scaledSize: new google.maps.Size(80, 40),
              anchor: new google.maps.Point(40, 40)
            }
          : {
              url: 'assets/pjlphotos/currentlocation.png',  // Custom yellow icon
              scaledSize: new google.maps.Size(80, 40),
              anchor: new google.maps.Point(40, 40)
            });
      } else {  // Fallback to circle path if no custom icon is set
        marker.setIcon( currentIcon &&  currentIcon.fillColor === 'yellow'
          ? {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: 'red',
              fillOpacity: 1,
              strokeColor: 'red',
              strokeWeight: 1
            }
          : {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: 'yellow',
              fillOpacity: 1,
              strokeColor: 'yellow',
              strokeWeight: 1
            });
      }
    }, 500);  // Blinking interval
  }






  addMarkerClickListener(marker: any, path: any) {


    marker.addListener('click', () => {
      console.log('info')
      ,console.log(path.destination)

      // this.infoWindow.setContent(`<div><strong>ID:</strong> ${path.id}</div>`);
      this.infoWindow.setContent(`
        <div>

          <strong>Destination Latitude:</strong> ${path.destination['lat']}<br>
          <strong>Destination Longitude:</strong> ${path.destination.lng}<br>
          <strong>Station To:</strong> ${path.stationTo || 'N/A'}<br>
          <strong>ETA Destination DateTime:</strong> ${path.alldata['etaDstinationDateTime'] || 'Not Available'}
        </div>
      `);


      this.infoWindow.open(this.map, marker);
      // this.navigateToDetail(path.id);

      this.highlightPath(path);
    });
  }

  highlightPath(path: any) {
    // Clear existing highlighted routes if any
    if (this.highlightedRoute) {
      this.highlightedRoute.setMap(null);
    }

    // Define a new DirectionsRenderer for the highlighted path
    const directionsRenderer = new google.maps.DirectionsRenderer({
      map: this.map,
      polylineOptions: {
        strokeColor: '#FF0000',  // Red color for highlighting
        strokeWeight: 6,         // Thicker line for highlighting
      },
    });

    const request = {
      origin: path.destination,      // Set the origin as the destination
      destination: path.source,     // Set the destination as the current location
      travelMode: google.maps.TravelMode.DRIVING
    };

    // Use DirectionsService to plot the highlighted path
    this.directionsService.route(request, (result: any, status: any) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
        this.highlightedRoute = directionsRenderer;  // Store the highlighted route for future use
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  }

  private refreshInterval: any;
  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  private startAutoRefresh(): void {
    this.refreshInterval = setInterval(() => {
      window.location.reload();
    }, 600000); // 10 minutes
  }

  getBack()
  {
    window.history.back();
  }


  gotoMapView(id:any)
  {
    console.log("ID")

    this.router.navigateByUrl('/googlemap/' + id);
  }
}
