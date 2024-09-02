import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fnrdetailsbyid',
  templateUrl: './fnrdetailsbyid.component.html',
  styleUrls: ['./fnrdetailsbyid.component.css']
})
export class FNRDETAILSBYIDComponent implements OnInit {

 map!: google.maps.Map;

  currentLocationMarker!: google.maps.Marker;

  ngOnInit() {
    const source = { lat: 24.5700754, lng: 80.9987201 };
    const destination = { lat: 25.578926, lng: 83.520514 };
    const currentLocation = { lat: 25.315167, lng: 82.930298 };

    // Initialize the map
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      zoom: 8,
      center: source,
    });

    // Add markers
    new google.maps.Marker({ position: source, map: this.map, title: 'Source' });
    new google.maps.Marker({ position: destination, map: this.map, title: 'Destination' });

    // Current location with blinking effect
    this.currentLocationMarker = new google.maps.Marker({
      position: currentLocation,
      map: this.map,
      title: 'Current Location',
      icon: {
        url: 'path-to-blinking-icon', // You can create a blinking icon or use CSS
      }
    });

    // Draw the path
    const pathCoordinates = [source, currentLocation, destination];
    const path = new google.maps.Polyline({
      path: pathCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    path.setMap(this.map);
  }}
