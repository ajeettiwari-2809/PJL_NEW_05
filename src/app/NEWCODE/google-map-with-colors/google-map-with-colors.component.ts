import { Component, OnInit } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

declare const google: any;
@Component({
  selector: 'app-google-map-with-colors',
  templateUrl: './google-map-with-colors.component.html',
  styleUrls: ['./google-map-with-colors.component.css']
})
export class GoogleMapWithColorsComponent   implements OnInit {
  map: any;
  directionsService: any;

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    const mapOptions = {
      zoom: 7,

      // 24.579716, 80.832176
      center: { lat: 24.579716, lng: 80.832176 } // satna
    };

    this.map = new google.maps.Map(document.getElementById('map')!, mapOptions);

    this.directionsService = new google.maps.DirectionsService();

    // Define your paths with source, cross, current and destination coordinates
    const paths = [
      {
        source: { lat: 24.537800, lng: 81.251600 }, // rewa
        cross: { lat: 24.570000, lng: 81.100000 }, // example cross location
        current: { lat: 24.600000, lng: 81.000000 }, // example current location
        destination: { lat: 24.579716, lng: 80.832176 }, // satna
        color: 'red'
      },
      // {
      //   source: { lat: 24.537800, lng: 81.251600 }, // rewa
      //   cross: { lat: 24.700000, lng: 81.300000 }, // example cross location
      //   current: { lat: 24.750000, lng: 81.200000 }, // example current location
      //   destination: { lat: 23.164722, lng: 79.951111 }, // jabalpur
      //   color: 'blue'
      // }
    ];

    paths.forEach((path) => {
      this.plotRoute(path);
    });
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
        { location: path.cross, stopover: false },
        { location: path.current, stopover: true }
      ],
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, (result: any, status: any) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
        this.addBlinkingMarker(path.current);
      }
    });
  }

  addBlinkingMarker(position: google.maps.LatLngLiteral) {
    const iconurl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEMPFg6BS2qkc_iSb_wmAZHH-vqxu43JySkw&s';
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

  addBlinkingMarker1(position: google.maps.LatLngLiteral) {
    const iconUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEMPFg6BS2qkc_iSb_wmAZHH-vqxu43JySkw&s'; // Replace with the URL of your truck icon
const  iconUrl1='https://thumbs.dreamstime.com/b/delivery-truck-shipping-fast-delivery-truck-icon-symbol-pictogram-flat-design-apps-websites-track-trace-processing-207212970.jpg';

    const marker = new google.maps.Marker({
      position: position,
      map: this.map,
      icon: {
        url: iconUrl,
        scaledSize: new google.maps.Size(32, 32), // Adjust size as needed
        anchor: new google.maps.Point(16, 32), // Adjust anchor point as needed
        // Optionally set additional properties if needed
      }
    });

    setInterval(() => {
      const currentIcon = marker.getIcon();
      marker.setIcon({
        url: currentIcon.url === iconUrl ? iconUrl1 : iconUrl1,
        scaledSize: new google.maps.Size(32, 32), // Keep the size the same
        anchor: new google.maps.Point(16, 32), // Keep the anchor the same
        // Optionally set additional properties if needed
      });
    }, 500);
  }


}
