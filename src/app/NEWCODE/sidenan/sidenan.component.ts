import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidenan',
  templateUrl: './sidenan.component.html',
  styleUrls: ['./sidenan.component.css']
})
export class SidenanComponent {
  isSidebarMinimized = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.isSidebarMinimized$.subscribe(isMinimized => {
      this.isSidebarMinimized = isMinimized;
    });
  }




}
