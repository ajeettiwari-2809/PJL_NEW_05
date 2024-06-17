import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  // form: FormGroup;
  modules: string[] = ['Module 1', 'Module 2', 'Module 3'];
  subModules: string[] = ['Sub Module 1', 'Sub Module 2', 'Sub Module 3'];
  muduleform!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toastr: ToastrService, private userStore: UserstoreService) {
    // this.initializeForms();

    this.muduleform = this.fb.group({
      modules: ['', Validators.required],
      submodule: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      documentlink: ['', Validators.required],
      vediolink: ['', Validators.required],
    });    
  }

  submitDetails() {
  console.log(this.muduleform.value)
  }

 
  getVehicleRequestList(status:any)
  {

  }
}
