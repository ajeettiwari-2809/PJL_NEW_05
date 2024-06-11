import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  start: boolean = false;

  constructor(private auth: AuthService, private http: HttpClient) { 

  }

  enroll(email: string, course: string) {
    // this.http.post<any>('https://localhost:7243/api/CourseEnrollments', { course })
    this.auth.enroll(email, course)
      .subscribe({
        next: (response)  => {
          console.log('Enrollment successful', response);
          // Handle success (e.g., show a success message)
        },
        error: (error) => {
          console.error('Error occurred during enrollment', error);
          // Handle error (e.g., show an error message)
        }
      });
  }


  Start(){
    this.start = true;
  }

  closeCard() {
    this.start = false;
  }
  
}
