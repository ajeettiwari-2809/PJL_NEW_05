import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  infoWindow: any; // Info window for displaying details

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loadMap();
    this.fetchData();
    this.startAutoRefresh();
  }

  loadMap() {
    const mapOptions = {
      zoom: 7,
      center: { lat: 24.579716, lng: 80.832176 } // Default center
    };

    this.map = new google.maps.Map(document.getElementById('map')!, mapOptions);
    this.directionsService = new google.maps.DirectionsService();
    this.infoWindow = new google.maps.InfoWindow(); // Initialize info window
  }

  fetchData() {
    console.log("Fetching data");
    const apiUrl = 'https://appdev.prismcement.com/pjlexpressqasapi/Users/getFOIS_List_Admin_Rack_Track';

    this.http.post(apiUrl, { "input": 0 }).subscribe((data: any) => {
      this.records = data;
      this.processData();
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

    Object.keys(sourceMap).forEach(sourceKey => {
      const records = sourceMap[sourceKey];
      const source = {
        lat: records[0].sourceLat,
        lng: records[0].sourcLong
      };

      records.forEach(record => {
        const path = {
          source: source,
          destination: { lat: record.destinationLat, lng: record.destinationLong },
          current: { lat: record.currentLat, lng: record.currentLong },
          color: this.getColorForRecord(record),
          stationFrom: record.stationFrom,
          stationTo: record.stationTo,
          lastRepLocn: record.lastRepLocn,
          id: record.id // Include record ID for navigation
        };

        this.addMarkers(path);
        this.plotRoute(path);
      });
    });
  }

  getColorForRecord(record: any): string {
    return 'red'; // Default color or modify as needed
  }

  plotRoute(path: any) {
    const directionsRenderer = new google.maps.DirectionsRenderer({
      map: this.map,
      polylineOptions: {
        strokeColor: path.color
      }
    });

    const request = {
      origin: path.source,
      destination: path.destination,
      waypoints: [
        { location: path.current, stopover: true }
      ],
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, (result: any, status: any) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  }

  addMarkers(path: any) {
    // Add the source marker with a transparent icon
    const sourceMarker = new google.maps.Marker({
      position: path.source,
      map: this.map,
      title: 'Source',
      icon: {
        url:null,
        // url: 'https://cdn-icons-png.flaticon.com/512/25/25694.png', // Transparent 1x1 pixel PNG
        scaledSize: new google.maps.Size(32, 32), // Adjust size if needed
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 32),
        zIndex: 700 // Ensure this is below the home icon
      },
      zIndex: 700, // Ensure this is below the home icon
      label: {
        text: path.stationFrom,
        color: 'blue',
        fontSize: '16px'
      }
    });

    // Add the home icon marker on top of the source marker
    const homeIconMarker = new google.maps.Marker({
      position: path.source, // Place it at the same location
      map: this.map,
      icon: {
        url: 'https://cdn-icons-png.flaticon.com/512/25/25694.png', // URL to the home icon
        scaledSize: new google.maps.Size(32, 32), // Resize icon if needed
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 32)
      },
      zIndex: 1000 // Home icon has a higher zIndex
    });

    // Add destination marker with stationTo as label
    const destinationMarker = new google.maps.Marker({
      position: path.destination,
      map: this.map,
      title: 'Destination',
      label: {
        text: path.stationTo,
        color: 'blue',
        fontSize: '16px'
      }
    });

    // Add current marker with blinking effect and lastRepLocn as label
    this.addBlinkingMarker(path.current, path.lastRepLocn);

    // Add click listeners to markers
    this.addMarkerClickListener(sourceMarker, path);
    this.addMarkerClickListener(homeIconMarker, path);
    this.addMarkerClickListener(destinationMarker, path);
  }

  addBlinkingMarker(position: google.maps.LatLngLiteral, lastRepLocn: string) {
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
        animation: google.maps.Animation.BOUNCE
      },
      label: {
        text: lastRepLocn,
        color: 'blue',
        fontSize: '16px'
      }
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

  addMarkerClickListener(marker: any, path: any) {
    marker.addListener('click', () => {
      console.log(`Clicked on marker with ID: ${path.id}`);
      this.infoWindow.setContent(`<div><strong>ID:</strong> ${path.id}</div>`);
      this.infoWindow.open(this.map, marker);
      this.navigateToDetail(path.id);
    });
  }

  navigateToDetail(routeId: number) {
    console.log(`Navigating to detail for ID: ${routeId}`);
    this.router.navigate(['/details', routeId]); // Adjust to your routing configuration
  }

  private refreshInterval: any;
  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  private startAutoRefresh(): void {
    // Set interval to refresh the component every 10 minutes (600000 milliseconds)
    this.refreshInterval = setInterval(() => {
      window.location.reload();
    }, 600000);
  }
}
