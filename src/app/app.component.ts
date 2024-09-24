import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SidebarService } from './services/sidebar.service';
import { NetworkService } from './services/network.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // constructor(private auth: AuthService,
  //   private router: Router ){}
  title = 'cyber2';

  sideBarOpen = true;
  isOnline: boolean = true;


  // sideBarToggler() {

  //   this.sideBarOpen = !this.sideBarOpen;
  // }
  isUserAuthenticated()
  {
    return this.auth.isLoggedIn();
  }

  @HostListener('window:beforeunload', ['$event'])


  handleBeforeUnload(event: Event) {
    // this.auth.signOut(); // Clear authentication state
  }


  isHandset: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver,private auth: AuthService,
       private router: Router,private sidebarService: SidebarService,private networkService: NetworkService) {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isHandset = result.matches;
      });
  }

  isSidebarMinimized = false;
  async ngOnInit() {
  await  this.networkService.onlineStatus$.subscribe(status => {
      console.log(status)
      this.isOnline = status;
    });

    this.sidebarService.isSidebarMinimized$.subscribe(isMinimized => {
      this.isSidebarMinimized = isMinimized;
    });
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }


  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }


}
