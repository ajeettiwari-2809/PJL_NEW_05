import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   baseUrl:string = "https://appdev.prismcement.com/pjlexpressqasapi/";

  // private baseUrl:string = "https://appdev.prismcement.com/pjlexpress"

  private ansapiurl: string = "https://localhost:7243/api/TestAnswers01";

  private isacttest001: string = "https://localhost:7243/api/IsactAnswers001";
  private attacksurfacestest001: string = "https://localhost:7243/api/AttackSurfacesAnswers001";
  private phishingspoofingtest001url: string = "https://localhost:7243/api/PhishingSpoofingAnswer001";
  private wirelessenvurl: string = "https://localhost:7243/api/WirelessEnvironmentAnswer001";
  private dosdontsurl: string = "https://localhost:7243/api/DosDontsAnswer001";
  private irmngmnturl: string = "https://localhost:7243/api/IRMngmntAnswer001";
  private dataprotecturl: string = "https://localhost:7243/api/DataProtectAnswer001";
  private dnsapturl: string = "https://localhost:7243/api/DnsAptAnswer001";
  private cyberstalkurl: string = "https://localhost:7243/api/CyberStalkBullyAnswer001";

  private courseurl: string = "https://localhost:7243/api/CourseEnrollments";
  private coursecompl: string = "https://localhost:7243/api/CoursesCompleted";
  private forgotpwd: string = "https://localhost:7243/api/User/forgot-password";
  // private test01: string = ""
  private userPayload: any;

  constructor(private http: HttpClient, private router: Router){
    this.userPayload = this.decodeToken();
  }

  signUp(userObj: any){
    return this.http.post<any>(`${this.baseUrl}Register`, userObj);
  }

  login(loginObj: any){
    console.log("My loginob");
    console.log(loginObj);

    const loginObjJson = JSON.stringify(loginObj);

    return this.http.post<any>(`${this.baseUrl}Auth/loginWithOTP`,loginObj);
  }

  getOTP(otpobj: any){
     return this.http.post<any>(`${this.baseUrl}Auth/userloginWithOTP`,otpobj);
  }

  forgot(userObj: any){
    return this.http.post<any>(`${this.forgotpwd}`, userObj );
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['homepage']);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    // console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getFullNameFromToken() {
    if (this.userPayload)
      return this.userPayload.name;
  }

  getEmailFromToken() {
    if (this.userPayload)
      return this.userPayload.email;
  }

  submitForm(formData: any): Observable<any> {
    return this.http.post(`${this.ansapiurl}`, formData);
  }

  isacttestForm(formData: any): Observable<any>{
    return this.http.post(`${this.isacttest001}`, formData);
  }

  attacksurfacesTestForm(formData: any): Observable<any>{
    return this.http.post(`${this.attacksurfacestest001}`, formData);
  }

  phishingspoofingtestForm(formData: any): Observable<any>{
    return this.http.post(`${this.phishingspoofingtest001url}`, formData);
  }

  wirelessenvironmenttestForm(formData: any): Observable<any>{
    return this.http.post(`${this.wirelessenvurl}`, formData);
  }

  dosanddontsForm(formData: any): Observable<any>{
    return this.http.post(`${this.dosdontsurl}`, formData);
  }

  irmngmntForm(formData: any): Observable<any>{
    return this.http.post(`${this.irmngmnturl}`, formData);
  }

  dataprotectForm(formData: any): Observable<any>{
    return this.http.post(`${this.dataprotecturl}`, formData);
  }

  dnsaptForm(formData: any): Observable<any>{
    return this.http.post(`${this.dnsapturl}`, formData);
  }

  cyberstalkForm(formData: any): Observable<any>{
    return this.http.post(`${this.cyberstalkurl}`, formData);
  }

  enroll(email: string, course: string){
    return this.http.post<any>(`${this.courseurl}?email= ${email.toString()}&course=${course.toString()}`, {email, course});
  }

  complete(email: string, course: string){
    return this.http.post<any>(`${this.coursecompl}?email= ${email.toString()}&course=${course.toString()}`, {email, course});
  }

  test01(email: string){
    return this.http.post<any>(`${this.ansapiurl}/test01?email= ${email.toString()}`, {email});
  }

  isacttest001check(email: string){
    return this.http.post<any>(`${this.isacttest001}/isactest001?email= ${email.toString()}`, {email});
  }

  attackcurfacestest001check(email: string){
    return this.http.post<any>(`${this.attacksurfacestest001}/attacksurfacestest001?email = ${email.toString()}`, {email});
  }

  phishingspoofingtest001check(email: string){
    return this.http.post<any>(`${this.phishingspoofingtest001url}/phishingspoofingtest001?email = ${email.toString()}`, {email});
  }

  wirelessenvtest001check(email: string){
    return this.http.post<any>(`${this.wirelessenvurl}/wirelessenvironmenttest001?email= ${email.toString()}`, {email});
  }

  dosanddontstest001check(email: string){
    return this.http.post<any>(`${this.dosdontsurl}/dosdontstest001?email= ${email.toString()}`, {email});
  }

  irmngmnttest001check(email: string){
    return this.http.post<any>(`${this.irmngmnturl}/irmngmnttest001?email= ${email.toString()}`, {email});
  }

  dataprotecttest001check(email: string){
    return this.http.post<any>(`${this.dataprotecturl}/dataprotecttest001?email= ${email.toString()}`, {email});
  }

  dnsapttest001check(email: string){
    return this.http.post<any>(`${this.dnsapturl}/dnsapttest001?email= ${email.toString()}`, {email});
  }

  cyberstalktest001check(email: string){
    return this.http.post<any>(`${this.cyberstalkurl}/cyberstalkbullytest001?email= ${email.toString()}`, {email});
  }

  sendOTP(email: string): Observable<any> {
    const url = `https://localhost:7243/api/OTPSender/send?email=${email.toString()}`;
    return this.http.post<any>(url, {email});
  }

  VerifyOTP(email: string, otp: string): Observable<any> {
    const url = `https://localhost:7243/api/OTPSender/verify?email=${email.toString()}&otp=${otp.toString()}`;
    return this.http.post<any>(url, {email, otp});
  }

  UpdatePassword(email: string, newPassword: string): Observable<any> {
    const url = `https://localhost:7243/api/OTPSender/reset?email=${email.toString()}&newPassword=${newPassword.toString()}`;
    return this.http.post<any>(url, {email, newPassword});
  }



}
