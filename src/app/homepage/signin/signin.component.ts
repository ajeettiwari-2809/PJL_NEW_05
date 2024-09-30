import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastModule, NgToastService, Position } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

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
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toastr: ToastrService, private userStore: UserstoreService,private spinner: NgxSpinnerService) {
    // this.initializeForms();

    this.loginForm = this.fb.group({
      userCode: ['', Validators.required],
    password:['', ],
    });

    // this.loginFormotp== this.fb.group({

    //   password: ['', Validators.required]
    // });
  }

ngOnInit(): void {

  // this.router.navigate(['/ZoneFois']);

  this.getUserDetails();

}


userDetails:any;
getUserDetails()
{

  const userDetailsString = localStorage.getItem('user');

  if (userDetailsString) {
    // Parse the string back into a JavaScript object
    this.userDetails = JSON.parse(userDetailsString);

    // Log the user details to the console
    console.log("User Details: ", this.userDetails);



    this.refreshDashboard(this.userDetails['appuser'])


  } else {
    console.log("No user details found in localStorage");
  }
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

   const appversion= this.auth.appversion;
    console.log("Method callinfs");
    if (this.loginForm.valid) {


      const userDetails = {
        userName:'',

        userOTP: this.loginForm.value.password,
        password:'',

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

this.refreshDashboard(res.appuser);
          // this.router.navigate(['/ZoneFois']);
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

  refreshDashboard(userDetails:any) {
    if(userDetails.roleCode=='ZLM')

    {
      console.log("your role is  ZLM")
      this.router.navigateByUrl('/ZoneFois', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/ZoneFois']);
    });

    }
   else if(userDetails.roleCode=='LOGADMIN')

      {  this.router.navigateByUrl('/googlemapcolor', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/googlemapcolor']);
      });

      }
      else{

        this.toastr.error("Your Login  Credential is changed, Kindly Contact with 'IT TEAM'. ")
      }

    //    console.log("inside login")
    // this.router.navigateByUrl('/googlemapcolor', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['/googlemapcolor']);
    // });
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
    const appversion=this.auth.appversion
    this.spinner.show();

    console.log(this.loginForm.value.userCode)

      if (this.loginForm.valid) {


        const userCode = {
          userCode: this.loginForm.value.userCode,
          appVersion: appversion

        };


       this.auth.getOTP(userCode)
        .subscribe({
          next:(res) =>{
            this.spinner.hide();

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
