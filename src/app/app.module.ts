import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CoursesComponent } from './courses/courses.component';
import { SigninComponent } from './homepage/signin/signin.component';
import { SignupComponent } from './homepage/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CS001Component } from './courses/cs001/cs001.component';
import { NgToastModule } from 'ng-angular-popup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AllcoursesComponent } from './allcourses/allcourses.component';
import { InformationSecurityComponent } from './courses/cs001/information-security-and-cia-triad/information-security/information-security.component';
import { CiaTriadComponent } from './courses/cs001/information-security-and-cia-triad/cia-triad/cia-triad.component';
import { CyberThreatComponent } from './courses/cs001/information-security-and-cia-triad/cyber-threat/cyber-threat.component';
import { CyberVulnerabilityComponent } from './courses/cs001/information-security-and-cia-triad/cyber-vulnerability/cyber-vulnerability.component';
import { CyberRiskComponent } from './courses/cs001/information-security-and-cia-triad/cyber-risk/cyber-risk.component';
import { ProtectNetworkComponent } from './courses/cs001/information-security-and-cia-triad/protect-network/protect-network.component';
import { AttackVectorsComponent } from './courses/cs001/attack-surfaces-and-its-types/attack-vectors/attack-vectors.component';
import { AttackSurfacesComponent } from './courses/cs001/attack-surfaces-and-its-types/attack-surfaces/attack-surfaces.component';
import { TypesOfAttackSurfacesComponent } from './courses/cs001/attack-surfaces-and-its-types/types-of-attack-surfaces/types-of-attack-surfaces.component';
import { AttackSurfacesLimitedComponent } from './courses/cs001/attack-surfaces-and-its-types/attack-surfaces-limited/attack-surfaces-limited.component';
import { PhishingComponent } from './courses/cs001/phishing-spoofing-and-its-types/phishing/phishing.component';
import { SpoofingComponent } from './courses/cs001/phishing-spoofing-and-its-types/spoofing/spoofing.component';
import { RansomwareComponent } from './courses/cs001/phishing-spoofing-and-its-types/ransomware/ransomware.component';
import { WifiSecurityComponent } from './courses/cs001/phishing-spoofing-and-its-types/wifi-security/wifi-security.component';
import { AttacksOnWirelessEnvironmentComponent } from './courses/cs001/wireless-environment-scams-and-precautions/attacks-on-wireless-environment/attacks-on-wireless-environment.component';
import { SecureWirelessCommunicationsComponent } from './courses/cs001/wireless-environment-scams-and-precautions/secure-wireless-communications/secure-wireless-communications.component';
import { ScamsComponent } from './courses/cs001/wireless-environment-scams-and-precautions/scams/scams.component';
import { PrecautionsComponent } from './courses/cs001/wireless-environment-scams-and-precautions/precautions/precautions.component';
import { DesktopSecurityComponent } from './courses/cs001/wireless-environment-scams-and-precautions/desktop-security/desktop-security.component';
import { PracticesToFollowComponent } from './courses/cs001/dos-and-donts/practices-to-follow/practices-to-follow.component';
import { DosComponent } from './courses/cs001/dos-and-donts/dos/dos.component';
import { DontsComponent } from './courses/cs001/dos-and-donts/donts/donts.component';
import { IncidentResponseManagementComponent } from './courses/cs001/ir-management/incident-response-management/incident-response-management.component';
import { PhasesOfIncidentResponseManagementComponent } from './courses/cs001/ir-management/phases-of-incident-response-management/phases-of-incident-response-management.component';
import { RoleOfIncidentResponseManagerComponent } from './courses/cs001/ir-management/role-of-incident-response-manager/role-of-incident-response-manager.component';
import { DataProtectionComponent } from './courses/cs001/data/data-protection/data-protection.component';
import { DataProtectionMeasuresComponent } from './courses/cs001/data/data-protection-measures/data-protection-measures.component';
import { HackersGenerallyTargetComponent } from './courses/cs001/data/hackers-generally-target/hackers-generally-target.component';
import { ToolsAndTechnologiesComponent } from './courses/cs001/data/tools-and-technologies/tools-and-technologies.component';
import { DnsAttacksComponent } from './courses/cs001/dns-and-apt-attacks/dns-attacks/dns-attacks.component';
import { AptAttacksComponent } from './courses/cs001/dns-and-apt-attacks/apt-attacks/apt-attacks.component';
import { SqlInjectionComponent } from './courses/cs001/dns-and-apt-attacks/sql-injection/sql-injection.component';
import { AttackersExploitationComponent } from './courses/cs001/dns-and-apt-attacks/attackers-exploitation/attackers-exploitation.component';
import { ManInTheMiddleAttackComponent } from './courses/cs001/dns-and-apt-attacks/man-in-the-middle-attack/man-in-the-middle-attack.component';
import { DdosComponent } from './courses/cs001/cyberstalking-and-cyberbullying/ddos/ddos.component';
import { CyberstalkingComponent } from './courses/cs001/cyberstalking-and-cyberbullying/cyberstalking/cyberstalking.component';
import { CyberstalkingCyberbullyingPreventionComponent } from './courses/cs001/cyberstalking-and-cyberbullying/cyberstalking-cyberbullying-prevention/cyberstalking-cyberbullying-prevention.component';
import { InformationSecurityAndCiaTriadComponent } from './courses/cs001/information-security-and-cia-triad/information-security-and-cia-triad.component';
import { AttackSurfacesAndItsTypesComponent } from './courses/cs001/attack-surfaces-and-its-types/attack-surfaces-and-its-types.component';
import { PhishingSpoofingAndItsTypesComponent } from './courses/cs001/phishing-spoofing-and-its-types/phishing-spoofing-and-its-types.component';
import { WirelessEnvironmentScamsAndPrecautionsComponent } from './courses/cs001/wireless-environment-scams-and-precautions/wireless-environment-scams-and-precautions.component';
import { DosAndDontsComponent } from './courses/cs001/dos-and-donts/dos-and-donts.component';
import { IRManagementComponent } from './courses/cs001/ir-management/ir-management.component';
import { DataComponent } from './courses/cs001/data/data.component';
import { DnsAndAptAttacksComponent } from './courses/cs001/dns-and-apt-attacks/dns-and-apt-attacks.component';
import { CyberstalkingAndCyberbullyingComponent } from './courses/cs001/cyberstalking-and-cyberbullying/cyberstalking-and-cyberbullying.component';
import { IsactTest001Component } from './courses/cs001/information-security-and-cia-triad/isact-test001/isact-test001.component';
import { Attacksurfacestest001Component } from './courses/cs001/attack-surfaces-and-its-types/attacksurfacestest001/attacksurfacestest001.component';
import { WirelessEnvironmentTest001Component } from './courses/cs001/wireless-environment-scams-and-precautions/wireless-environment-test001/wireless-environment-test001.component';
import { Phishingspoofingtest001Component } from './courses/cs001/phishing-spoofing-and-its-types/phishingspoofingtest001/phishingspoofingtest001.component';
import { DosAndDontsTest001Component } from './courses/cs001/dos-and-donts/dos-and-donts-test001/dos-and-donts-test001.component';
import { IrManagementTest001Component } from './courses/cs001/ir-management/ir-management-test001/ir-management-test001.component';
import { DataProtectionTest001Component } from './courses/cs001/data/data-protection-test001/data-protection-test001.component';
import { DntAptTest001Component } from './courses/cs001/dns-and-apt-attacks/dnt-apt-test001/dnt-apt-test001.component';
import { CyberTest001Component } from './courses/cs001/cyberstalking-and-cyberbullying/cyber-test001/cyber-test001.component';
import { SidenanComponent } from './NEWCODE/sidenan/sidenan.component';
import { HeadernavComponent } from './NEWCODE/headernav/headernav.component';
import { DashboardHomeComponent } from './NEWCODE/dashboard-home/dashboard-home.component';
import { SalesModulesComponent } from './NEWCODE/sales-modules/sales-modules.component';
import { PlayVediosComponent } from './NEWCODE/play-vedios/play-vedios.component';
import { AdminDashboardComponent } from './NEWCODE/ADMIN/admin-dashboard/admin-dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { Chart } from 'chart.js';
// import { NgChartsModule } from 'ng2-charts';
// import { ChartsModule } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';
import { GooglemapComponent } from './NEWCODE/googlemap/googlemap.component';
import { GoogleMapWithColorsComponent } from './NEWCODE/google-map-with-colors/google-map-with-colors.component';
import { GoogleMapsModule } from '@angular/google-maps';

// import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CoursesComponent,
    SigninComponent,
    SignupComponent,
    CS001Component,
    AllcoursesComponent,
    InformationSecurityComponent,
    CiaTriadComponent,
    CyberThreatComponent,
    CyberVulnerabilityComponent,
    CyberRiskComponent,
    ProtectNetworkComponent,
    AttackVectorsComponent,
    AttackSurfacesComponent,
    TypesOfAttackSurfacesComponent,
    AttackSurfacesLimitedComponent,
    PhishingComponent,
    SpoofingComponent,
    RansomwareComponent,
    WifiSecurityComponent,
    AttacksOnWirelessEnvironmentComponent,
    SecureWirelessCommunicationsComponent,
    ScamsComponent,
    PrecautionsComponent,
    DesktopSecurityComponent,
    PracticesToFollowComponent,
    DosComponent,
    DontsComponent,
    IncidentResponseManagementComponent,
    PhasesOfIncidentResponseManagementComponent,
    RoleOfIncidentResponseManagerComponent,
    DataProtectionComponent,
    DataProtectionMeasuresComponent,
    HackersGenerallyTargetComponent,
    ToolsAndTechnologiesComponent,
    DnsAttacksComponent,
    AptAttacksComponent,
    SqlInjectionComponent,
    AttackersExploitationComponent,
    ManInTheMiddleAttackComponent,
    DdosComponent,
    CyberstalkingComponent,
    CyberstalkingCyberbullyingPreventionComponent,
    InformationSecurityAndCiaTriadComponent,
    AttackSurfacesAndItsTypesComponent,
    PhishingSpoofingAndItsTypesComponent,
    WirelessEnvironmentScamsAndPrecautionsComponent,
    DosAndDontsComponent,
    IRManagementComponent,
    DataComponent,
    DnsAndAptAttacksComponent,
    CyberstalkingAndCyberbullyingComponent,
    IsactTest001Component,
    Attacksurfacestest001Component,
    WirelessEnvironmentTest001Component,
    Phishingspoofingtest001Component,
    DosAndDontsTest001Component,
    IrManagementTest001Component,
    DataProtectionTest001Component,
    DntAptTest001Component,
    CyberTest001Component,
    SidenanComponent,
    HeadernavComponent,
    DashboardHomeComponent,
    SalesModulesComponent,
    PlayVediosComponent,
    AdminDashboardComponent,
    GooglemapComponent,



  ],
  imports: [

    BrowserModule,
    // NgChartsModule,
    NgChartsModule,

    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    RouterModule,
    HttpClientModule,
    NgToastModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
    }),
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatMenuModule,
    GoogleMapsModule






  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
