// sidebar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isSidebarMinimizedSubject = new BehaviorSubject<boolean>(false);
  isSidebarMinimized$ = this.isSidebarMinimizedSubject.asObservable();

  toggleSidebar() {
    this.isSidebarMinimizedSubject.next(!this.isSidebarMinimizedSubject.value);
  }
}
