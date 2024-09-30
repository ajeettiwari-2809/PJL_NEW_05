import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit{
  userDetails: any;
  userRole: any;
  tokenExpDate:any;


ngOnInit(): void {
  this.getUserDetails();
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
      this.userRole = this.userDetails['appuser'];
      this.tokenExpDate=this.userDetails['tokenExpiresIn'];
      console.log("User detils: ", this.userRole);
    } else {
      console.log("No user details found in localStorage");
    }
  }
}
