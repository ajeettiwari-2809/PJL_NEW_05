import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fnrdetailsbyid',
  templateUrl: './fnrdetailsbyid.component.html',
  styleUrls: ['./fnrdetailsbyid.component.css']
})
export class FNRDETAILSBYIDComponent implements OnInit {
  map!: google.maps.Map;
  truckMarker!: google.maps.Marker;
  locations: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchDataAndInitMap();
  }

  fetchDataAndInitMap(): void {
    // Replace with your actual API endpoint
    const apiUrl = 'https://appdev.prismcement.com/pjlexpressqasapi/Users/getFOIS_List_Admin_Rack_Track_ById';

    this.http.post(apiUrl,{ "input": 4,
      "inputString": "string"}).subscribe((data: any) => {
      // Assuming data is an array of location objects
      this.locations = this.parseApiData(data);
      this.initMap();
    });
  }

  parseApiData(apiData: any[]): any[] {
    return apiData.map((data, index) => ({
      lat: data.currentLat,
      lng: data.currentLong,
      label: index === 0 ? 'Start' : index === apiData.length - 1 ? 'End' : 'Cross',
      description: index !== 0 && index !== apiData.length - 1 ? data.currentStatus : undefined
    }));
  }

  initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: this.locations[this.locations.length - 2].lat, lng: this.locations[this.locations.length - 2].lng },
      zoom: 16
    };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    this.locations.forEach((location, index) => {
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: this.map,
        label: location.label,
        zIndex: index === this.locations.length - 2 ? 2 : 1,
        icon: index === this.locations.length - 2 ? {
          url: 'https://static.thenounproject.com/png/335079-200.png',
          scaledSize: new google.maps.Size(40, 40)
        } : undefined
      });

      if (index === this.locations.length - 2) {
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

    const request: google.maps.DirectionsRequest = {
      origin: new google.maps.LatLng(this.locations[0].lat, this.locations[0].lng),
      destination: new google.maps.LatLng(this.locations[this.locations.length - 1].lat, this.locations[this.locations.length - 1].lng),
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, (response, status) => {
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
