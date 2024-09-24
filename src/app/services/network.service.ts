import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, of, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { mapToCanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private onlineSubject = new BehaviorSubject<boolean>(navigator.onLine);
  public onlineStatus$ = this.onlineSubject.asObservable();

  constructor(private http: HttpClient) {

    this.checkInternetConnection();
    // Listen to 'online' and 'offline' events
    fromEvent(window, 'online').subscribe(() => this.checkInternetConnection());
    fromEvent(window, 'offline').subscribe(() => this.updateOnlineStatus(false));
  }

  private updateOnlineStatus(isOnline: boolean) {


    console.log("call:" +isOnline)
    this.onlineSubject.next(isOnline);
  }

  // Method to check actual internet connection by pinging a reliable server
  private checkInternetConnection() {

    timer(0, 30000) // check every 30 seconds
      .pipe(
        switchMap(() => this.http.get('https://www.google.com', { responseType: 'text' })
          .pipe(
            mapTo(true),

            catchError(() => of(false)) // If request fails, mark as offline
          )
        )
      ).subscribe(isOnline => {
        console.log("Satus:" +isOnline)
        this.updateOnlineStatus(isOnline);
      });
  }
}
