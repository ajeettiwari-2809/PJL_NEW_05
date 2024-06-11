import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-wireless-environment-test001',
  templateUrl: './wireless-environment-test001.component.html',
  styleUrls: ['./wireless-environment-test001.component.css']
})
export class WirelessEnvironmentTest001Component {

  submittedw: boolean = false;
  start: boolean = false;
  model: any = {
    email: '',
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
    this.submittedw = localStorage.getItem('formSubmitted') === 'true';
  }

  submitForm() { //working
    // Assuming model is properly populated with user selections    
    this.submittedw = true;
    this.start = false;
    localStorage.setItem('formSubmitted', 'true'); 
    this.auth.wirelessenvironmenttestForm(this.model).subscribe({
      next: (response) => {        
        this.toastr.success(response.message);                
      },
      error: (error) => {        
        this.toastr.error(error?.error.message);      
      }
    });
  }

  CheckTest001(email: string){
    this.auth.wirelessenvtest001check(email)
      .subscribe({
        next: (response)  => {
          this.router.navigate(['courses/cs001/dos-and-donts/practices-to-follow']);
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
