import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Location } from '@angular/common';

@Component({
  selector: 'app-play-vedios',
  templateUrl: './play-vedios.component.html',
  styleUrls: ['./play-vedios.component.css']
})
export class PlayVediosComponent {
  constructor(private location: Location, private router: Router) {}

  goBack() {
    this.location.back();
  }

  // Method to navigate to a specific route
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  // Additional method to perform some action
  performAction() {
    console.log('Action performed!');
  }
}
