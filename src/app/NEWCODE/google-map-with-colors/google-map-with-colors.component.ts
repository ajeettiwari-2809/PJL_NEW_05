import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare const google: any;

@Component({
  selector: 'app-google-map-with-colors',
  templateUrl: './google-map-with-colors.component.html',
  styleUrls: ['./google-map-with-colors.component.css']
})
export class GoogleMapWithColorsComponent implements OnInit, OnDestroy {
  map: any;
  directionsService: any;
  records: any[] = [];
  records1: any[] = [];
  infoWindow: any;
  transitRecords: any[] = [];
  baseurl: string = this.authService.baseUrl;
  isDropdownOpen: { [key: string]: boolean } = {};
  arrivalData:any=[];
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,

  ) {

  }

  ngOnInit() {
    this.loadMap();
    this.fetchData();
    this.startAutoRefresh();
    this.fetchTransitCount();
  this.getVersionCheck();


    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if this is the component you want to refresh
        this.refreshComponent();
      }
    });

  }
  getVersionCheck()
  {
    const appver=this.authService.appversion;

    // this.spinner.show();

   const apiUrl=this.baseurl+ 'Trans/getUserVersion_Checking?versionCode=';
   const finalurl=apiUrl+ appver;

    this.http.post(finalurl, {
    }).subscribe((data: any) => {

    // this.spinner.hide();

  if(data['status']==401)
  {
    window.alert("you are using old version, Please wait we are finding latest version ");
    window.location.reload();
    this.authService.signOut(); // Use your logout method here
    this.router.navigate(['']);
  }



  })
}



  refreshComponent()
  {
    window.location.reload();
  }

  toggleDropdown(zoneCode: string) {
    this.isDropdownOpen[zoneCode] = !this.isDropdownOpen[zoneCode];
  }
  ByZoneRecord(id:any)
  {

  //  this.router.navigateByUrl['/fnrDetails'];
  //
   this.router.navigateByUrl('/fnrDetails/'+id);



  }

  getArrivalData()
  {
    this.arrivalData=[{
      'title':'message1',
      'description':'some Data'
    }]
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

  fetchData() {
    this.spinner.show();
    const apiUrl = this.baseurl + 'Trans/getFOIS_List_Admin_Rack_Track';
    this.http.post(apiUrl, { "input": 0, "inputString": "string" }).subscribe((data: any) => {
      this.spinner.hide();
      this.records =  data;
      this.records1= data;


      // this.records =  data.filter((item: { zoneCode: string; }) => item.zoneCode === 'BH');;
      // this.records1= data.filter((item: { zoneCode: string; }) => item.zoneCode === 'BH');;
      this.processData();
    },


      (error) => {

        this.spinner.hide(); // Hide the spinner if there's an error
        this.authService.signOut(); // Use your logout method here
        this.router.navigate(['']); // Redirect to login page

        if (error instanceof HttpErrorResponse) {
          console.log("Full error:", error.status);
          // Handle HTTP errors (server errors, client errors)
          if (error.status === 401) {
            // Token expired or unauthorized, log out the user
            window.alert("Your Login Is Expired. Please log in again.");
            this.authService.signOut(); // Use your logout method here
            this.router.navigate(['']); // Redirect to login page

          } else {
            window.alert(`An error occurred: ${error.status} - ${error.message}`);
          }
        } else {
          // Handle network or unknown errors (non-HTTP errors)
          window.alert("A network error occurred, or Your Login Credential Is Expired ? Logout.. ");
        }
      }
    );




  }

  fetchTransitCount() {
    this.spinner.show();
    const apiUrl = this.baseurl + 'Trans/getFOIS_Count';
    this.http.post(apiUrl, {}).subscribe((data: any) => {
      this.spinner.hide();
      this.transitRecords = data;
      console.log(data)



    });
  }

  processData() {
    const sourceMap: { [key: string]: any[] } = {};

    this.records.forEach(record => {
      const sourceKey = `${record.sourceLat},${record.sourcLong}`;

      if (!sourceMap[sourceKey]) {
        sourceMap[sourceKey] = [];
      }
      sourceMap[sourceKey].push(record);
    });

// zone circle start
    const zoneMap: { [key: string]: any[] } = {};

    // Group locations by zone code
    this.records1.forEach(record => {
      if (!zoneMap[record.zoneCode]) {
        zoneMap[record.zoneCode] = [];
      }
      zoneMap[record.zoneCode].push(record);
    });

    Object.keys(zoneMap).forEach(zoneCode => {
      const locations = zoneMap[zoneCode];
// console.log('my location is')
console.log(locations)
      // Calculate the center and radius for the zone circle
      const { center, radius } = this.calculateZoneCircle(locations);

      // Draw the circle on the map
      // this.drawZoneCircle(center, radius, this.getColorForZone(zoneCode));


    });


    // end
    Object.keys(sourceMap).forEach(sourceKey => {
      const records = sourceMap[sourceKey];
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


  calculateZoneCircle(locations: any[]): { center: google.maps.LatLngLiteral, radius: number } {
    let latSum = 0, lngSum = 0;

    // Calculate centroid (average latitude and longitude)
    locations.forEach(location => {
      latSum += location.destinationLat;
      lngSum += location.destinationLong;
    });
    console.log(latSum);
    const center = {
      lat: latSum / locations.length,
      lng: lngSum / locations.length
    };
console.log("Data");
    console.log( center);


    // Calculate the radius as the maximum distance from the center to any location
    let maxDistance = 0;
    locations.forEach(location => {
      const distance = this.calculateDistance(center, { lat: location.destinationLat, lng: location.destinationLong });
      console.log('distance' + distance)
      if (distance > maxDistance) {
        maxDistance = distance;
      }
    });
    console.log("Zone cirlce" + center + maxDistance)

    return { center, radius: maxDistance };
  }

  // Draw a circle on the map
  drawZoneCircle(center: google.maps.LatLngLiteral, radius: number, color: string) {
    console.log("Draw circle" + color),
    new google.maps.Circle({
      strokeColor: color,
      strokeOpacity: 0.1,
      strokeWeight: 5,
      fillColor: color,
      fillOpacity: .3,
      map: this.map,
      center: center,
      radius: radius
    });
  }

  // Utility function to calculate the distance between two points (in meters)
  calculateDistance(point1: google.maps.LatLngLiteral, point2: google.maps.LatLngLiteral): number {

    const R = 6371000; // Radius of the Earth in meters
    const lat1 = this.toRadians(point1.lat);
    const lat2 = this.toRadians(point2.lat);

    console.log('delat long' + (lat2-lat1))

    const deltaLat = this.toRadians(point2.lat - point1.lat);
    const deltaLng = this.toRadians(point2.lng - point1.lng);

// console.log('delat long' +deltaLng)
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }

  toRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }
  getColorForZone(zoneCode: string): string {
    switch (zoneCode) {
      case 'CUP': return 'purple';
      case 'MP': return 'blue';
      case 'BH': return 'yellow';
      case 'EUP': return 'red';
      default: return 'red';
    }
  }

  createZoneCircle(record: any) {
    // Define the circle options
    const zoneCircleOptions = {
      strokeColor: this.getColorForRecord(record),
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: this.getColorForRecord(record),
      fillOpacity: 0.35,
      map: this.map,
      center: { lat: record.currentLat, lng: record.currentLong }, // Use the current location as the center
      radius: 50000 // Adjust the radius as per your requirement
    };

    // Create the circle
    new google.maps.Circle(zoneCircleOptions);
  }

  getColorForRecord(record: any): string {
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
      travelMode: google.maps.TravelMode.DRIVING,
      // transitOptions: {
      //   modes: [google.maps.TransitMode.TRAIN],  // Filter for train travel
      // }
    };

    directionsRenderer.setOptions({
      suppressMarkers: true
    });
    this.directionsService.route(request, (result: any, status: any) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
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
      // label: { text:' path.customerName', color: 'blue', fontSize: '16px' }
    });


    // curent marker
    const currenteMarker = new google.maps.Marker({
      position: path.curent,
      map: this.map,
      icon: {

        url: 'assets/pjlphotos/D6.png',
        scaledSize: new google.maps.Size(80, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(40, 40)
      },
      zIndex: 700,
      label: { text:' path.customerName', color: 'blue', fontSize: '16px' }
    });



    // Destination marker
    const destinationMarker1 = new google.maps.Marker({
      position: path.destination,
      map: this.map,
      icon: {
        url: 'assets/pjlphotos/ware1.png',
        scaledSize: new google.maps.Size(40, 20),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20,20)
      },

      zIndex: 700,
      // visible: false,
    });
  // Destination marker with semi-transparent circular background


  let destinationMarker = new google.maps.Marker();

  if(path.alldata['zoneCode']=='CUP')
  {
    destinationMarker = new google.maps.Marker({
      position: path.destination,
      map: this.map,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="20" fill="purple" fill-opacity="0.4" />
            <image href="assets/pjlphotos/ware1.png" x="5" y="5" height="30" width="30"/>
          </svg>
        `),
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 20),
      },
      zIndex: 700,
    });
  }

  else if(path.alldata['zoneCode']=='BH')
  {
    destinationMarker = new google.maps.Marker({
      position: path.destination,
      map: this.map,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="20" fill="yellow" fill-opacity="0.4" />
            <image href="assets/pjlphotos/ware1.png" x="5" y="5" height="30" width="30"/>
          </svg>
        `),
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 20),
      },
      zIndex: 700,
    });
  }
  else if(path.alldata['zoneCode']=='EUP')
    {
      destinationMarker = new google.maps.Marker({
        position: path.destination,
        map: this.map,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="20" fill="#F08080" fill-opacity="0.4" />
              <image href="assets/pjlphotos/ware1.png" x="5" y="5" height="30" width="30"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 20),
        },
        zIndex: 700,
      });
    }


    else{

      destinationMarker = new google.maps.Marker({
        position: path.destination,
        map: this.map,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="20" fill="blue" fill-opacity="0.4" />
              <image href="assets/pjlphotos/ware1.png" x="5" y="5" height="30" width="30"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 20),
        },
        zIndex: 700,
      });
    }


    // Current location marker with blinking effect
    this.addBlinkingMarker(path.current, path.lastRepLocn,path);

    // Add click listeners to markers
    this.addMarkerClickListener(sourceMarker, path);
    this.addMarkerClickListener(destinationMarker, path);
    // this.addMarkerClickListenerCurrent(currenteMarker, path);

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

  addBlinkingMarker(position: google.maps.LatLngLiteral, lastRepLocn: string,path:any) {
    // Define the initial marker options with a custom icon
    const marker = new google.maps.Marker({
      position: position,
      map: this.map,
      icon: {
        // url: 'assets/pjlphotos/currentlocation.png',  // Custom icon URL
        scaledSize: new google.maps.Size(40,40),  // Custom size for the icon
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


     this.addMarkerClickListenerCurrent(path ,marker);
    // Blinking effect by changing the icon's color or toggling visibility
    setInterval(() => {
      const currentIcon = marker.getIcon() as google.maps.Icon | google.maps.Symbol | null;

      // Toggle between two icon styles (yellow and red colors)
      if ( currentIcon && 'url' in currentIcon) {  // Check if the current icon has a URL (custom icon)
        marker.setIcon(currentIcon.url === 'assets/pjlphotos/currentlocation.png'
          ? {
              // url: 'assets/pjlphotos/currentlocation.png',
              // scaledSize: new google.maps.Size(80, 40),
              // anchor: new google.maps.Point(40, 40),


              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: 'yellow',
              fillOpacity: 1,
              strokeColor: 'yellow',
              strokeWeight: 1,

            }
          : {
              url: 'assets/pjlphotos/currentlocation.png',  // Custom yellow icon
              scaledSize: new google.maps.Size(80, 40),
              anchor: new google.maps.Point(40, 40)
            });
      } else {  // Fallback to circle path if no custom icon is set
        marker.setIcon( currentIcon && currentIcon.fillColor === 'yellow'
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
              strokeWeight: 1,

            });
      }
    }, 500);  // Blinking interval
  }


  addMarkerClickListener(marker: any, path: any) {


    marker.addListener('click', () => {

      this.infoWindow.setContent(`
        <div>


          <strong>Station To:</strong> ${path.alldata['stationTo'] || 'Not Available'}<br>
          <strong>Est  Destination DateTime:</strong> ${path.alldata['etaDstinationDateTime'] || 'Not Available'}<br>
           <strong>Current Status:</strong> ${path.alldata['currentStatus'] || 'Not Available'}<br>
            <strong>Depo Name:</strong> ${path.alldata['depotName'] || 'Not Available'}<br>


        </div>
      `);


      this.infoWindow.open(this.map, marker);
      this.navigateToDetail(path.id);
    });
  }


  addMarkerClickListenerCurrent( path: any,marker: any) {


    marker.addListener('click', () => {

      this.infoWindow.setContent(`
        <div>



           <strong>Current Status:</strong> ${path.alldata['currentStatus'] || 'Not Available'}<br>
            <strong>Station To:</strong> ${path.alldata['stationTo'] || 'Not Available'}<br>
          <strong>Est  Destination DateTime:</strong> ${path.alldata['etaDstinationDateTime'] || 'Not Available'}<br>
            <strong>Depo Name:</strong> ${path.alldata['depotName'] || 'Not Available'}<br>


        </div>
      `);


      this.infoWindow.open(this.map, marker);
      this.navigateToDetail(path.id);
    });
  }








  navigateToDetail(routeId: number) {
    // Implement navigation to detail page
    // this.router.navigate(['/details', routeId]);
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


  getCardColor(zoneCode: string): string {
    if (zoneCode === 'MP') {
      return '#ADD8E6'; // light blue
    } else if (zoneCode === 'BH') {
      return '#e7eb9d'; // light yellow
    } else if (zoneCode === 'CUP') {
      return '#D8BFD8'; // light purple (thistle)
    }
    return '#F08080'; // light coral (default color)
  }

}
