import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  constructor(private auth: AuthService,private sidebarService: SidebarService,
    private router: Router, ){}


    ngOnInit() {







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
}
