import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dos-and-donts-test001',
  templateUrl: './dos-and-donts-test001.component.html',
  styleUrls: ['./dos-and-donts-test001.component.css']
})
export class DosAndDontsTest001Component {

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
    this.auth.dosanddontsForm(this.model).subscribe({
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
    this.auth.dosanddontstest001check(email)
      .subscribe({
        next: (response)  => {
          this.router.navigate(['courses/cs001/IR-management/incident-response-management']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
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
