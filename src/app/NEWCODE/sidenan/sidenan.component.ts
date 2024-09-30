import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidenan',
  templateUrl: './sidenan.component.html',
  styleUrls: ['./sidenan.component.css']
})
export class SidenanComponent {
  @Input() isSidebarMinimized = false;

  userDetails:any;
  userRole:any;


  // isSidebarMinimized = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {

    this.getUserDetails();
    this.sidebarService.isSidebarMinimized$.subscribe(isMinimized => {
      this.isSidebarMinimized = isMinimized;
    });
  }


  getUserDetails()
  {

    const userDetailsString = localStorage.getItem('user');

    if (userDetailsString) {
      // Parse the string back into a JavaScript object
      this.userDetails = JSON.parse(userDetailsString);

      // Log the user details to the console
      console.log("User Details: ", this.userDetails);

      // Access the token
      this.userRole = this.userDetails['appuser']['roleCode'];
      console.log("User detils: ", this.userRole);
    } else {
      console.log("No user details found in localStorage");
    }
  }



}
