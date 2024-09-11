import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-testmsp',
  templateUrl: './testmsp.component.html',
  styleUrls: ['./testmsp.component.css']
})
export class TestmspComponent   {

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

  // 10 destination LatLng points
  destinations: google.maps.LatLngLiteral[] = [
    { lat: 12.9715987, lng: 77.5945627 },
    { lat: 28.704060, lng: 77.102493 },
    { lat: 19.076090, lng: 72.877426 },
    // Add the remaining LatLng points here
  ];

  center: google.maps.LatLngLiteral;
  radius: number;
  zoom = 5;

  circleOptions = {
    fillColor: 'rgba(0, 0, 255, 0.2)',
    strokeColor: '#0000FF',
    strokeOpacity: 0.8,
    strokeWeight: 2,
  };

  constructor() {
    this.center = this.calculateCenter();
    this.radius = this.calculateRadius();
  }

  // Calculate the centroid (geographical center)
  calculateCenter(): google.maps.LatLngLiteral {
    let latSum = 0;
    let lngSum = 0;

    this.destinations.forEach(point => {
      latSum += point.lat;
      lngSum += point.lng;
    });

    const avgLat = latSum / this.destinations.length;
    const avgLng = lngSum / this.destinations.length;

    return { lat: avgLat, lng: avgLng };
  }

  // Calculate the radius to cover all points
  calculateRadius(): number {
    const center = new google.maps.LatLng(this.center.lat, this.center.lng);
    let maxDistance = 0;

    this.destinations.forEach(point => {
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        center, new google.maps.LatLng(point.lat, point.lng)
      );
      if (distance > maxDistance) {
        maxDistance = distance;
      }
    });

    return maxDistance; // Radius in meters
  }
}
