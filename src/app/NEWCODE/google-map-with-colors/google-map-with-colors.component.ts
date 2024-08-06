import { Component, OnInit } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';

declare const google: any;

@Component({
  selector: 'app-google-map-with-colors',
  templateUrl: './google-map-with-colors.component.html',
  styleUrls: ['./google-map-with-colors.component.css']
})
export class GoogleMapWithColorsComponent implements OnInit {
  map: any;
  directionsService: any;
  records: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadMap();
    this.fetchData();
  }

  loadMap() {
    const mapOptions = {
      zoom: 7,
      center: { lat: 24.579716, lng: 80.832176 } // Default center
    };

    this.map = new google.maps.Map(document.getElementById('map')!, mapOptions);

    this.directionsService = new google.maps.DirectionsService();
  }

  fetchData() {
    // Replace with your API endpoint
    const apiUrl = 'https://appdev.prismcement.com/pjlexpressqasapi/Users/getFOIS_List_Admin_Rack_Track';

    this.http.post(apiUrl,{ "input": 0}).subscribe((data: any) => {
      this.records = data;
      this.processData();
    });
  }

  processData() {
    // Group records by source
    const sourceMap: { [key: string]: any[] } = {};

    this.records.forEach(record => {
      const sourceKey = `${record.sourceLat},${record.sourcLong}`;
      if (!sourceMap[sourceKey]) {
        sourceMap[sourceKey] = [];
      }
      sourceMap[sourceKey].push(record);
    });

    // Plot markers and routes for each group
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
          color: this.getColorForRecord(record) // Optionally use a color for different records
        };

        this.addMarkers(path);
        this.plotRoute(path);
      });
    });
  }

  getColorForRecord(record: any): string {
    // Logic to return a color based on the record
    // For example, you could use different colors based on some property
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
      }
    });
  }

  addMarkers(path: any) {
    // Add source marker
    new google.maps.Marker({
      position: path.source,
      map: this.map,
      title: 'Source',
      label: {
        text: 'Source',
        color: 'blue',
        fontSize: '16px'
      }
    });

    // Add destination marker
    new google.maps.Marker({
      position: path.destination,
      map: this.map,
      title: 'Destination',
      label: {
        text: 'Destination',
        color: 'blue',
        fontSize: '16px'
      }
    });

    // Add current marker with blinking effect
    this.addBlinkingMarker(path.current);
  }

  addBlinkingMarker(position: google.maps.LatLngLiteral) {
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
        text: 'Current',
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
}
