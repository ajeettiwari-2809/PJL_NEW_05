import { Component, EventEmitter, OnInit, Output,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-headernav',
  templateUrl: './headernav.component.html',
  styleUrls: ['./headernav.component.css']
})
export class HeadernavComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  userDetails: any;
  userRole: any;
  constructor(private auth: AuthService,private sidebarService: SidebarService,
    private router: Router, ){}


    ngOnInit() {

this.getUserDetails();
}

nabigateToProfile()
{
  this.router.navigate(['/userProfile']);
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
      console.log("User detils: ", this.userRole);
    } else {
      console.log("No user details found in localStorage");
    }
  }
  isUserAuthenticated()
  {
    return this.auth.isLoggedIn();
  }

  logout()
  {

    console.log('ff');

      this.auth.signOut();
      this.router.navigate(['']);

  }
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
    // this.toggleSidebarForMe.emit();
  }



  enterFullscreen() {
    const elem = document.documentElement as any;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }

    else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
      elem.webkitRequestFullscreen();
    }
    else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
    }
   }
   exitFullscreen() {
    const doc = document as any;

    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) { // Firefox
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) { // Chrome, Safari and Opera
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) { // IE/Edge
      doc.msExitFullscreen();
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.enterFullscreen();
    } else {
      this.exitFullscreen();
    }
  }
}

