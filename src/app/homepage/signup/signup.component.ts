import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppRoutingModule } from 'src/app/app-routing.module';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {

  signupForm!: FormGroup;
  hide = true;
  showPassword: boolean = false;
  
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toastr: ToastrService) {
    // this.initializeForms();
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })    
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignup(){
    if(this.signupForm.valid){
      // console.log(this.signupForm.value);
      this.auth.signUp(this.signupForm.value)
      .subscribe({
        next:(res => {
          this.toastr.success(res.message);
          // alert(res.message);
          this.signupForm.reset();
          this.router.navigate(['homepage/signin']);
        })
        ,error:(err => {
          this.toastr.error(err?.error.message);
          // alert(err?.error.message)
        })
      })
    }
    else{
      ValidateForm.validateAllFormFields(this.signupForm);
      // alert("Your Form is invalid");
      this.toastr.error("Your Form is invalid");
    }
  }

  email: string = '';
  dropdownVisible: boolean = false;
  emailDomains: string[] = ['@gmail.com', '@yahoo.com', '@outlook.com', '@example.com'];

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  closeDropdown(): void {
    this.dropdownVisible = false;
  }

  selectDomain(domain: string): void {
    const atIndex = this.email.indexOf('@');
    const emailPrefix = atIndex !== -1 ? this.email.substring(0, atIndex) : this.email;
    this.email = emailPrefix + domain;
    this.closeDropdown();
  }
}
