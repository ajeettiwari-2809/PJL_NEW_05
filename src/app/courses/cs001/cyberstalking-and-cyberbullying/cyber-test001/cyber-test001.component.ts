import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cyber-test001',
  templateUrl: './cyber-test001.component.html',
  styleUrls: ['./cyber-test001.component.css']
})
export class CyberTest001Component {

  submitted: boolean = false;
  start: boolean = false;
  model: any = {
    email: '', // Initialize model properties
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: '',
  };

  constructor(private http: HttpClient, private auth: AuthService, private toastr: ToastrService, private router: Router) {     
    this.submitted = localStorage.getItem('formSubmitted') === 'true';
  }

  submitForm() { //working
    // Assuming your model is properly populated with user selections
    // console.log('Submitting form:', this.model);
    this.submitted = true;
    this.start = false;
    localStorage.setItem('formSubmitted', 'true'); 
    this.auth.cyberstalkForm(this.model).subscribe({
      next: (response) => {
        // console.log('Submission successful:', response);   
        this.toastr.success(response.message);
      },
      error: (error) => {
        // console.error('Error submitting form:', error);
        this.toastr.error(error?.error.message);      
      }
    });
  }

  CheckTest001(email: string){
    this.auth.cyberstalktest001check(email)
      .subscribe({
        next: (response)  => {
          this.toastr.success(response.message);
          // this.router.navigate(['courses/cs001/cyberstalking-and-cyberbullying/ddos']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
    }

    complete(email: string, course: string) {
      // this.http.post<any>('https://localhost:7243/api/CourseEnrollments', { course })
      this.auth.complete(email, course)
        .subscribe({
          next: (response)  => {
            // console.log('Completion of Course Successfull', response);
            // this.toastr.success(response.message);
            // Handle success (e.g., show a success message)
          },
          error: (error) => {
            // console.error('Error occurred during enrollment', error);
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
