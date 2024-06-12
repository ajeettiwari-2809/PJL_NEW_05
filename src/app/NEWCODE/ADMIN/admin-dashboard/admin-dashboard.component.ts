import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  // form: FormGroup;
  modules: string[] = ['Module 1', 'Module 2', 'Module 3'];
  subModules: string[] = ['Sub Module 1', 'Sub Module 2', 'Sub Module 3'];

  constructor(private fb: FormBuilder) {
   
  }

  onSubmit() {
    // if (this.form.valid) {
    //   console.log('Form Submitted!', this.form.value);
    // } else {
    //   console.error('Form is invalid');
    // }
  }

 
  getVehicleRequestList(status:any)
  {

  }
}
