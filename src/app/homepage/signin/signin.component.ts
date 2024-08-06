import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastModule, NgToastService, Position } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  loginForm!: FormGroup;
  loginFormotp!:FormGroup;
  signupForm!: FormGroup;
  forgotPassword!: FormGroup;
  start: boolean = false;
  showPassword: boolean = false;
  forshowPassword: boolean = false;

  email!: string;
  otp!: string;
  newPassword!: string;
  showOTPInput: boolean = false;
  otpVerified: boolean = false;  

  hide = true;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toastr: ToastrService, private userStore: UserstoreService) {
    // this.initializeForms();

    this.loginForm = this.fb.group({
      userCode: ['', Validators.required],
    password:['', ],
    });   
    
    // this.loginFormotp== this.fb.group({
      
    //   password: ['', Validators.required]
    // });   
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibilityfor(){
    this.forshowPassword = !this.forshowPassword;
  }
  
  // onSubmit(){
  //   if(this.forgotPassword.valid){
  //     // console.log(this.signupForm.value);
  //     this.auth.forgot(this.forgotPassword.value)
  //     .subscribe({
  //       next:(res => {
  //         this.toastr.success(res.message);
  //         // alert(res.message);
  //         this.forgotPassword.reset();
  //         this.router.navigate(['homepage/signin']);
  //       })
  //       ,error:(err => {
  //         this.toastr.error(err?.error.message);
  //         // alert(err?.error.message)
  //       })
  //     })
  //   }
  //   else{
  //     ValidateForm.validateAllFormFields(this.forgotPassword);
  //     // alert("Your Form is invalid");
  //     this.toastr.error("Your Form is invalid");
  //   }
  // }

  onSubmit(forgotPasswordForm: NgForm){
    if (forgotPasswordForm.invalid) {
      // Form is invalid, do not proceed
      return;
    }    
  }

  sendOTP(){
    this.showOTPInput = true;
    this.auth.sendOTP(this.email)
      .subscribe({
        next: (response) => {          
          this.toastr.success(response.message);
        },
        error: (err) => {          
          this.toastr.error(err?.error.message);
        }
      });    
  }

  verifyOTP() {
    this.showOTPInput = true;
    this.auth.VerifyOTP(this.email, this.otp)
      .subscribe({
        next: (response) => {
          this.toastr.success(response.message);
          this.showOTPInput = false;
          this.otpVerified= true;          
        },
        error: (err) => {
          this.toastr.error(err?.error.message);
        }
      });      
  }

  updatePassword() {
    this.auth.UpdatePassword(this.email, this.newPassword)
      .subscribe({
        next: (response) => {
          this.toastr.success(response.message);   
          this.closeForm();              
        },
        error: (err) => {
          this.toastr.error(err?.error.message);
        }
      });    
  }

  closeForm() {
    // Reset form fields and flags
    this.email = '';
    this.otp = '';
    this.newPassword = '';
    this.showOTPInput = false;
    this.otpVerified = false;    
  }

  onLogin() {

    console.log("Method callinfs");
    if (this.loginForm.valid) {


      const userDetails = {
        userName:'',

        userOTP: this.loginForm.value.password,
        password:''
      };
   
     this.auth.login(userDetails)
      .subscribe({
        next:(res) =>{

if(res.status==200)
  {
 console.log("After login"),
          // this.loginForm.reset();
         console.log(res), 
         this.auth.storeToken(res.token); 
          localStorage.setItem('user', JSON.stringify(res));

          const tokenPayload = this.auth.decodeToken();
         
          this.userStore.setFullNameForStore(tokenPayload.name);

          this.toastr.success(res.message);    
console.log("Navigate"),
this.refreshDashboard();
          // this.router.navigate(['/dashboardhome']);
          console.log("Navigate after");

          // window.location.reload();
  }
  else{
    this.toastr.error(res.message);  
  }

         
          
        },
        error:(err)=>{
          this.toastr.error(err?.error.message);
          // alert(err?.error.message);
        }
      })
      //send the obj to database
    }
    else {
      
      ValidateForm.validateAllFormFields(this.loginForm);
      this.toastr.error("Your Form is Invalid!");
      // alert("Your form is invalid");
      //throw the error 
    }
  }

  refreshDashboard() {
console.log("inside login")
    this.router.navigateByUrl('/dashboardhome', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboardhome']);
    });
  }

  Start(){
    this.start = true;
  }

  closeCard() {
    this.start = false;
  }
  isUserAuthenticated()
  {
    return this.auth.isLoggedIn();
  }
  reloadWindow()
  {
    

      window.location.reload();
     
   
  }
  otpstatus:boolean=false;
  getOTPVerify()
  {

    console.log(this.loginForm.value.userCode)
      
      if (this.loginForm.valid) {
  
  
        const userCode = {
          userCode: this.loginForm.value.userCode,
        
        };
     
       this.auth.getOTP(userCode)
        .subscribe({
          next:(res) =>{
  
  if(res.status==200)
    {
   console.log("After login"),
           
            this.toastr.success(res.message);    
            this.otpstatus=true;
           
    }
    else{
      this.toastr.error(res.message);  
    }
  },
    error:(err)=>{
            this.toastr.error(err?.error.message);
            // alert(err?.error.message);
          }
        })
        //send the obj to database
      }
      else {
        
        ValidateForm.validateAllFormFields(this.loginForm);
        this.toastr.error("Your Form is Invalid!");
        
      }
    

  }
}
