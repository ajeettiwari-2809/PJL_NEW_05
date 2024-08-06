import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})
export class GooglemapComponent implements OnInit {
  map!: google.maps.Map;

  locations = [
    { lat: 24.5373, lng: 81.3043, label: 'Start' },
    { lat: 24.6005, lng: 80.8322, label: 'Cross', description: 'Description of the crossing point.' },
    { lat: 23.1815, lng: 79.9864, label: 'Current' },
    { lat: 23.2599, lng: 77.4126, label: 'End' }
  ];

  truckMarker!: google.maps.Marker;

  constructor() { }

  ngOnInit(): void {
    this.initMap();
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
}
