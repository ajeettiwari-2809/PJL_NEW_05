import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

import { SigninComponent } from './homepage/signin/signin.component';
import { SignupComponent } from './homepage/signup/signup.component';

import { AuthGuard } from './guards/auth.guard';
import { DashboardHomeComponent } from './NEWCODE/dashboard-home/dashboard-home.component';
import { SalesModulesComponent } from './NEWCODE/sales-modules/sales-modules.component';
import { PlayVediosComponent } from './NEWCODE/play-vedios/play-vedios.component';
import { AdminDashboardComponent } from './NEWCODE/ADMIN/admin-dashboard/admin-dashboard.component';
import { GooglemapComponent } from './NEWCODE/googlemap/googlemap.component';
import { GoogleMapWithColorsComponent } from './NEWCODE/google-map-with-colors/google-map-with-colors.component';
import { FNRDETAILSComponent } from './NEWCODE/fnrdetails/fnrdetails.component';
import { FNRDETAILSBYIDComponent } from './NEWCODE/fnrdetailsbyid/fnrdetailsbyid.component';
import { TestmspComponent } from './NEWCODE/testmsp/testmsp.component';




const routes: Routes = [


  { path: '', component: SigninComponent },

  { path: 'homepage/signin', component: SigninComponent},
  { path: 'signup', component: SignupComponent },



  //For Active Authguard
  {
    path: '',

    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'dashboardhome', component: DashboardHomeComponent },
      { path: 'salesmoduleScreens', component: SalesModulesComponent },
      // { path: 'salesmoduleScreens', component: SalesModuleComponent },
      { path: 'playvedios', component: PlayVediosComponent },
      { path: 'admindashboard', component: AdminDashboardComponent },

      { path: 'googlemap/:id', component: GooglemapComponent },

      { path: 'googlemapcolor', component: GoogleMapWithColorsComponent },
      {path: 'fnrDetails/:id', component: FNRDETAILSComponent},
      {path: 'fnrDetailsById', component: FNRDETAILSBYIDComponent},
      {path: 'testmap', component: TestmspComponent},
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
