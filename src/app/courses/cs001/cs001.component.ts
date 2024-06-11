import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UserstoreService } from 'src/app/services/userstore.service';
import { NavigationEnd, Router, ActivatedRoute, Event  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';

@Component({
  selector: 'app-cs001',
  templateUrl: './cs001.component.html',
  styleUrls: ['./cs001.component.css'],
  animations: [
    trigger('drawerAnimation', [
      state('open', style({
        transform: 'translateX(0)',
      })),
      state('closed', style({
        transform: 'translateX(-100%)',
      })),
      transition('open <=> closed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class CS001Component {
  drawerState = 'closed';
  public fullName: string = "";
  public email: string = "";
  showChapter1Topics: boolean = false;
  showChapter2Topics: boolean = false;
  showChapter3Topics: boolean = false;
  showChapter4Topics: boolean = false;
  showChapter5Topics: boolean = false;
  showChapter6Topics: boolean = false;
  showChapter7Topics: boolean = false;
  showChapter8Topics: boolean = false;
  showChapter9Topics: boolean = false;

  isdefaultChpter: boolean = false;
  isChapter1Active: boolean = false;
  isChapter2Active: boolean = false;
  isChapter3Active: boolean = false;
  isChapter4Active: boolean = false;
  isChapter5Active: boolean = false;
  isChapter6Active: boolean = false;
  isChapter7Active: boolean = false;
  isChapter8Active: boolean = false;
  isChapter9Active: boolean = false;

  isChapter1Sub1Active: boolean = false;
  isChapter1Sub2Active: boolean = false; 
  isChapter1Sub3Active: boolean = false;
  isChapter1Sub4Active: boolean = false;
  isChapter1Sub5Active: boolean = false;
  isChapter1Sub6Active: boolean = false;

  isChapter2Sub1Active: boolean = false;
  isChapter2Sub2Active: boolean = false; 
  isChapter2Sub3Active: boolean = false;
  isChapter2Sub4Active: boolean = false;

  isChapter3Sub1Active: boolean = false;
  isChapter3Sub2Active: boolean = false; 
  isChapter3Sub3Active: boolean = false;
  isChapter3Sub4Active: boolean = false;

  isChapter4Sub1Active: boolean = false;
  isChapter4Sub2Active: boolean = false; 
  isChapter4Sub3Active: boolean = false;
  isChapter4Sub4Active: boolean = false;
  isChapter4Sub5Active: boolean = false;

  isChapter5Sub1Active: boolean = false;
  isChapter5Sub2Active: boolean = false; 
  isChapter5Sub3Active: boolean = false;

  isChapter6Sub1Active: boolean = false;
  isChapter6Sub2Active: boolean = false; 
  isChapter6Sub3Active: boolean = false;

  isChapter7Sub1Active: boolean = false;
  isChapter7Sub2Active: boolean = false; 
  isChapter7Sub3Active: boolean = false;
  isChapter7Sub4Active: boolean = false;

  isChapter8Sub1Active: boolean = false;
  isChapter8Sub2Active: boolean = false; 
  isChapter8Sub3Active: boolean = false;
  isChapter8Sub4Active: boolean = false;
  isChapter8Sub5Active: boolean = false;

  isChapter9Sub1Active: boolean = false;
  isChapter9Sub2Active: boolean = false; 
  isChapter9Sub3Active: boolean = false;

  constructor(private auth: AuthService, private userStore: UserstoreService, private router: Router, private toastr: ToastrService) {
    this.userStore.getFullNameFromStore()
      .subscribe(val => {
        let fullNameFromToken = this.auth.getFullNameFromToken();
        this.fullName = val || fullNameFromToken
      });
    this.userStore.getEmailFromStore()
      .subscribe(val => {
        let emailFromToken = this.auth.getEmailFromToken();
        this.email = val || emailFromToken
      })
            
      this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {        
        // this.updateActiveStates(event.url);   

        this.isdefaultChpter = event.url.includes('/courses/cs001/information-security-and-cia-triad/information-security');

        //Chapter 1

        this.isChapter1Active = event.url.includes('/information-security-and-cia-triad/');      

        this.isChapter1Sub1Active = event.url.includes('/information-security-and-cia-triad/information-security');

        this.isChapter1Sub2Active = event.url.includes('/information-security-and-cia-triad/cia-triad');

        this.isChapter1Sub3Active = event.url.includes('/information-security-and-cia-triad/cyber-threat');

        this.isChapter1Sub4Active = event.url.includes('/information-security-and-cia-triad/cyber-vulnerability');

        this.isChapter1Sub5Active = event.url.includes('/information-security-and-cia-triad/cyber-risk');

        this.isChapter1Sub6Active = event.url.includes('/information-security-and-cia-triad/protect-network');           
        
        //Chapter 2

        this.isChapter2Active = event.url.includes('/courses/cs001/attack-surfaces-and-its-types/');
        
        this.isChapter2Sub1Active = event.url.includes('/courses/cs001/attack-surfaces-and-its-types/attack-vectors') && !this.isChapter2Sub2Active && !this.isChapter2Sub3Active && !this.isChapter2Sub4Active;

        this.isChapter2Sub2Active = event.url.includes('/courses/cs001/attack-surfaces-and-its-types/attack-surfaces') && !this.isChapter2Sub1Active && !this.isChapter2Sub3Active && !this.isChapter2Sub4Active;

        this.isChapter2Sub3Active = event.url.includes('/courses/cs001/attack-surfaces-and-its-types/types-of-attack-surfaces') && !this.isChapter2Sub1Active && !this.isChapter2Sub2Active && !this.isChapter2Sub4Active;
        
        this.isChapter2Sub4Active = event.url.includes('/courses/cs001/attack-surfaces-and-its-types/attack-surfaces-limited') && !this.isChapter2Sub1Active && !this.isChapter2Sub2Active && !this.isChapter2Sub3Active;


        //Chapter 3
        this.isChapter3Active = event.url.includes('/phishing-spoofing-and-its-types/');

        this.isChapter3Sub1Active = event.url.includes('/phishing-spoofing-and-its-types/phishing') && !this.isChapter3Sub2Active && !this.isChapter3Sub3Active && !this.isChapter3Sub4Active;

        this.isChapter3Sub2Active = event.url.includes('/phishing-spoofing-and-its-types/spoofing');

        this.isChapter3Sub3Active = event.url.includes('/phishing-spoofing-and-its-types/ransomware');

        this.isChapter3Sub4Active = event.url.includes('/phishing-spoofing-and-its-types/wifi-security');



        //Chapter 4
        this.isChapter4Active = event.url.includes('/wireless-environment-scams-and-precautions/');

        this.isChapter4Sub1Active = event.url.includes('/wireless-environment-scams-and-precautions/attacks-on-wireless-environment');

        this.isChapter4Sub2Active = event.url.includes('/wireless-environment-scams-and-precautions/secure-wireless-communications');

        this.isChapter4Sub3Active = event.url.includes('/wireless-environment-scams-and-precautions/scams');

        this.isChapter4Sub4Active = event.url.includes('/wireless-environment-scams-and-precautions/precautions');

        this.isChapter4Sub5Active = event.url.includes('/wireless-environment-scams-and-precautions/desktop-security');


        //Chapter 5
        this.isChapter5Active = event.url.includes('/dos-and-donts/');

        this.isChapter5Sub1Active = event.url.includes('/dos-and-donts/practices-to-follow');

        this.isChapter5Sub2Active = event.url.includes('/dos-and-donts/dos') && !this.isChapter5Sub1Active && !this.isChapter5Sub3Active;

        this.isChapter5Sub3Active = event.url.includes('/dos-and-donts/donts');



        //Chapter 6
        this.isChapter6Active = event.url.includes('/IR-management/');

        this.isChapter6Sub1Active = event.url.includes('/IR-management/incident-response-management');

        this.isChapter6Sub2Active = event.url.includes('/IR-management/phases-of-incident-response-management');

        this.isChapter6Sub3Active = event.url.includes('/IR-management/role-of-incident-response-manager');


        //Chapter 7
        this.isChapter7Active = event.url.includes('/data/');

        this.isChapter7Sub1Active = event.url.includes('/data/data-protection') && !this.isChapter7Sub2Active && !this.isChapter7Sub3Active && !this.isChapter7Sub4Active;

        this.isChapter7Sub2Active = event.url.includes('/data/data-protection-measures') && !this.isChapter7Sub1Active && !this.isChapter7Sub3Active && !this.isChapter7Sub4Active;

        this.isChapter7Sub3Active = event.url.includes('/data/hackers-generally-target') && !this.isChapter7Sub1Active && !this.isChapter7Sub2Active && !this.isChapter7Sub4Active;

        this.isChapter7Sub4Active = event.url.includes('/data/tools-and-technologies') && !this.isChapter7Sub1Active && !this.isChapter7Sub2Active && !this.isChapter7Sub3Active;



        //Chapter 8
        this.isChapter8Active = event.url.includes('/dns-and-apt-attacks/');

        this.isChapter8Sub1Active = event.url.includes('/dns-and-apt-attacks/dns-attacks');

        this.isChapter8Sub2Active = event.url.includes('/dns-and-apt-attacks/apt-attacks');

        this.isChapter8Sub3Active = event.url.includes('/dns-and-apt-attacks/sql-injection');

        this.isChapter8Sub4Active = event.url.includes('/dns-and-apt-attacks/attackers-exploitation');

        this.isChapter8Sub5Active = event.url.includes('/dns-and-apt-attacks/man-in-the-middle-attack');

        

        //Chapter 9
        this.isChapter9Active = event.url.includes('/cyberstalking-and-cyberbullying/');

        this.isChapter9Sub1Active = event.url.includes('/cyberstalking-and-cyberbullying/ddos');

        this.isChapter9Sub2Active = event.url.includes('/cyberstalking-and-cyberbullying/cyberstalking') && !this.isChapter9Sub1Active && !this.isChapter9Sub3Active;

        this.isChapter9Sub3Active = event.url.includes('/cyberstalking-and-cyberbullying/cyberstalking-cyberbullying-prevention') && !this.isChapter9Sub1Active && !this.isChapter9Sub2Active;
      });            
  }

  toggleChapter1Topics() {
    this.showChapter1Topics = !this.showChapter1Topics;
    if(!this.isChapter1Active){
      this.isChapter1Active = true;
      this.isChapter2Active = false;
      this.isChapter3Active = false;
      this.isChapter4Active = false;
      this.isChapter5Active = false;
      this.isChapter6Active = false;
      this.isChapter7Active = false;
      this.isChapter8Active = false;
      this.isChapter9Active = false;  
      this.Chapter1();    
    }
  }

  toggleChapter1Sub1Topics(){
    if (!this.isChapter1Sub1Active) {
      this.isChapter1Sub1Active = true;
      this.isChapter1Sub2Active = false;
      this.isChapter1Sub3Active = false;
      this.isChapter1Sub4Active = false;
      this.isChapter1Sub5Active = false;
      this.isChapter1Sub6Active = false;
      this.Chapter1();       
    }
  }

  toggleChapter1Sub2Topics(){    
    if (!this.isChapter1Sub2Active) {    
      this.isChapter1Sub1Active = false;      
      this.isChapter1Sub2Active = true;      
      this.isChapter1Sub3Active = false;
      this.isChapter1Sub4Active = false;
      this.isChapter1Sub5Active = false;
      this.isChapter1Sub6Active = false;
      this.Chapter1();      
    }
  }

  toggleChapter1Sub3Topics(){    
    if (!this.isChapter1Sub3Active) {    
      this.isChapter1Sub1Active = false;      
      this.isChapter1Sub2Active = false;       
      this.isChapter1Sub3Active = true;
      this.isChapter1Sub4Active = false;
      this.isChapter1Sub5Active = false;
      this.isChapter1Sub6Active = false;
      this.Chapter1();
    }
  }

  toggleChapter1Sub4Topics(){    
    if (!this.isChapter1Sub4Active) {    
      this.isChapter1Sub1Active = false;      
      this.isChapter1Sub2Active = false;       
      this.isChapter1Sub3Active = false;
      this.isChapter1Sub4Active = true;
      this.isChapter1Sub5Active = false;
      this.isChapter1Sub6Active = false;
      this.Chapter1();
    }
  }

  toggleChapter1Sub5Topics(){    
    if (!this.isChapter1Sub5Active) {    
      this.isChapter1Sub1Active = false;      
      this.isChapter1Sub2Active = false;       
      this.isChapter1Sub3Active = false;
      this.isChapter1Sub4Active = false;
      this.isChapter1Sub5Active = true;
      this.isChapter1Sub6Active = false;
      this.Chapter1();
    }
  }

  toggleChapter1Sub6Topics(){    
    if (!this.isChapter1Sub6Active) {    
      this.isChapter1Sub1Active = false;      
      this.isChapter1Sub2Active = false;       
      this.isChapter1Sub3Active = false;
      this.isChapter1Sub4Active = false;
      this.isChapter1Sub5Active = false;
      this.isChapter1Sub6Active = true;
      this.Chapter1();
    }
  }

  Chapter1(){
      this.isChapter1Active = true;
      this.isChapter2Active = false;
      this.isChapter3Active = false;
      this.isChapter4Active = false;
      this.isChapter5Active = false;
      this.isChapter6Active = false;
      this.isChapter7Active = false;
      this.isChapter8Active = false;
      this.isChapter9Active = false;

      this.isChapter2Sub1Active = false;
      this.isChapter2Sub2Active = false;
      this.isChapter2Sub3Active = false;
      this.isChapter2Sub4Active = false;

      this.isChapter3Sub1Active = false;
      this.isChapter3Sub2Active = false;
      this.isChapter3Sub3Active = false;
      this.isChapter3Sub4Active = false;

      this.isChapter4Sub1Active = false;
      this.isChapter4Sub2Active = false;
      this.isChapter4Sub3Active = false;
      this.isChapter4Sub4Active = false;      
      this.isChapter4Sub5Active = false;

      this.isChapter5Sub1Active = false;
      this.isChapter5Sub2Active = false;
      this.isChapter5Sub3Active = false;

      this.isChapter6Sub1Active = false;
      this.isChapter6Sub2Active = false;
      this.isChapter6Sub3Active = false;

      this.isChapter7Sub1Active = false;
      this.isChapter7Sub2Active = false;
      this.isChapter7Sub3Active = false;   
      this.isChapter7Sub4Active = false;

      this.isChapter8Sub1Active = false;
      this.isChapter8Sub2Active = false;
      this.isChapter8Sub3Active = false;   
      this.isChapter8Sub4Active = false;       
      this.isChapter8Sub5Active = false; 

      this.isChapter9Sub1Active = false;
      this.isChapter9Sub2Active = false;
      this.isChapter9Sub3Active = false;
  }

  // Chapter 2 ----------------------------------------------------

  toggleChapter2Topics() {
    this.showChapter2Topics = !this.showChapter2Topics;    
    if(!this.isChapter2Active){
      this.isChapter1Active = false;
      this.isChapter2Active = true;
      this.isChapter3Active = false;
      this.isChapter4Active = false;
      this.isChapter5Active = false;
      this.isChapter6Active = false;
      this.isChapter7Active = false;
      this.isChapter8Active = false;
      this.isChapter9Active = false;
      this.Chapter2();
    }
  }

  toggleChapter2Sub1Topics(){
    if (!this.isChapter2Sub1Active) {
      this.isChapter2Sub1Active = true;
      this.isChapter2Sub2Active = false;
      this.isChapter2Sub3Active = false;
      this.isChapter2Sub4Active = false;   
      this.Chapter2();   
    }
  }

  toggleChapter2Sub2Topics(){    
    if (!this.isChapter2Sub2Active) {    
      this.isChapter2Sub1Active = false;      
      this.isChapter2Sub2Active = true;      
      this.isChapter2Sub3Active = false;
      this.isChapter2Sub4Active = false;    
      this.Chapter2();   
    }
  }

  toggleChapter2Sub3Topics(){    
    if (!this.isChapter2Sub3Active) {    
      this.isChapter2Sub1Active = false;      
      this.isChapter2Sub2Active = false;       
      this.isChapter2Sub3Active = true;
      this.isChapter2Sub4Active = false;      
      this.Chapter2();   
    }
  }

  toggleChapter2Sub4Topics(){    
    if (!this.isChapter2Sub4Active) {    
      this.isChapter2Sub1Active = false;      
      this.isChapter2Sub2Active = false;       
      this.isChapter2Sub3Active = false;
      this.isChapter2Sub4Active = true; 
      this.Chapter2();   
    }
  }

  Chapter2(){
      this.isChapter1Active = false;
      this.isChapter2Active = true; 
      this.isChapter3Active = false;
      this.isChapter4Active = false;
      this.isChapter5Active = false;
      this.isChapter6Active = false;
      this.isChapter7Active = false;
      this.isChapter8Active = false;
      this.isChapter9Active = false;

      this.isChapter1Sub1Active = false;
      this.isChapter1Sub2Active = false;
      this.isChapter1Sub3Active = false;
      this.isChapter1Sub4Active = false;
      this.isChapter1Sub5Active = false;
      this.isChapter1Sub6Active = false;      

      this.isChapter3Sub1Active = false;
      this.isChapter3Sub2Active = false;
      this.isChapter3Sub3Active = false;
      this.isChapter3Sub4Active = false;

      this.isChapter4Sub1Active = false;
      this.isChapter4Sub2Active = false;
      this.isChapter4Sub3Active = false;
      this.isChapter4Sub4Active = false;      
      this.isChapter4Sub5Active = false;

      this.isChapter5Sub1Active = false;
      this.isChapter5Sub2Active = false;
      this.isChapter5Sub3Active = false;

      this.isChapter6Sub1Active = false;
      this.isChapter6Sub2Active = false;
      this.isChapter6Sub3Active = false;

      this.isChapter7Sub1Active = false;
      this.isChapter7Sub2Active = false;
      this.isChapter7Sub3Active = false;   
      this.isChapter7Sub4Active = false;

      this.isChapter8Sub1Active = false;
      this.isChapter8Sub2Active = false;
      this.isChapter8Sub3Active = false;   
      this.isChapter8Sub4Active = false;       
      this.isChapter8Sub5Active = false; 

      this.isChapter9Sub1Active = false;
      this.isChapter9Sub2Active = false;
      this.isChapter9Sub3Active = false;
  }

  //Chapter 3 ------------------------------------------------------------------

  toggleChapter3Topics() {
    this.showChapter3Topics = !this.showChapter3Topics;
    if(!this.isChapter3Active){
      this.isChapter1Active = false;
      this.isChapter2Active = false;
      this.isChapter3Active = true;
      this.isChapter4Active = false;
      this.isChapter5Active = false;
      this.isChapter6Active = false;
      this.isChapter7Active = false;
      this.isChapter8Active = false;
      this.isChapter9Active = false;
      this.Chapter3();
    }
  }

  toggleChapter3Sub1Topics(){
    if (!this.isChapter3Sub1Active) {
      this.isChapter3Sub1Active = true;
      this.isChapter3Sub2Active = false;
      this.isChapter3Sub3Active = false;
      this.isChapter3Sub4Active = false;      
      this.Chapter3();
    }
  }

  toggleChapter3Sub2Topics(){    
    if (!this.isChapter3Sub2Active) {    
      this.isChapter3Sub1Active = false;      
      this.isChapter3Sub2Active = true;      
      this.isChapter3Sub3Active = false;
      this.isChapter3Sub4Active = false;      
      this.Chapter3();
    }
  }

  toggleChapter3Sub3Topics(){    
    if (!this.isChapter3Sub3Active) {    
      this.isChapter3Sub1Active = false;      
      this.isChapter3Sub2Active = false;       
      this.isChapter3Sub3Active = true;
      this.isChapter3Sub4Active = false;      
      this.Chapter3();
    }
  }

  toggleChapter3Sub4Topics(){    
    if (!this.isChapter3Sub4Active) {    
      this.isChapter3Sub1Active = false;      
      this.isChapter3Sub2Active = false;       
      this.isChapter3Sub3Active = false;
      this.isChapter3Sub4Active = true;      
      this.Chapter3();
    }
  }

  Chapter3(){
      this.isChapter1Active = false;
      this.isChapter2Active = false; 
      this.isChapter3Active = true; 
      this.isChapter4Active = false;
      this.isChapter5Active = false;
      this.isChapter6Active = false;
      this.isChapter7Active = false;
      this.isChapter8Active = false;
      this.isChapter9Active = false;
      
      this.isChapter1Sub1Active = false;
      this.isChapter1Sub2Active = false;
      this.isChapter1Sub3Active = false;
      this.isChapter1Sub4Active = false;
      this.isChapter1Sub5Active = false;
      this.isChapter1Sub6Active = false;

      this.isChapter2Sub1Active = false;
      this.isChapter2Sub2Active = false;
      this.isChapter2Sub3Active = false;
      this.isChapter2Sub4Active = false;

      this.isChapter4Sub1Active = false;
      this.isChapter4Sub2Active = false;
      this.isChapter4Sub3Active = false;
      this.isChapter4Sub4Active = false;      
      this.isChapter4Sub5Active = false;

      this.isChapter5Sub1Active = false;
      this.isChapter5Sub2Active = false;
      this.isChapter5Sub3Active = false;

      this.isChapter6Sub1Active = false;
      this.isChapter6Sub2Active = false;
      this.isChapter6Sub3Active = false;

      this.isChapter7Sub1Active = false;
      this.isChapter7Sub2Active = false;
      this.isChapter7Sub3Active = false;   
      this.isChapter7Sub4Active = false;

      this.isChapter8Sub1Active = false;
      this.isChapter8Sub2Active = false;
      this.isChapter8Sub3Active = false;   
      this.isChapter8Sub4Active = false;       
      this.isChapter8Sub5Active = false; 

      this.isChapter9Sub1Active = false;
      this.isChapter9Sub2Active = false;
      this.isChapter9Sub3Active = false;
  }

  //Chapter 4 ----------------------------------------------------------------

  toggleChapter4Topics() {
    this.showChapter4Topics = !this.showChapter4Topics;
    if(!this.isChapter4Active){
      this.isChapter1Active = false;
      this.isChapter2Active = false;
      this.isChapter3Active = false;
      this.isChapter4Active = true;
      this.isChapter5Active = false;
      this.isChapter6Active = false;
      this.isChapter7Active = false;
      this.isChapter8Active = false;
      this.isChapter9Active = false;
      this.Chapter4();
    }
  }

  toggleChapter4Sub1Topics(){
    if (!this.isChapter4Sub1Active) {
      this.isChapter4Sub1Active = true;
      this.isChapter4Sub2Active = false;
      this.isChapter4Sub3Active = false;
      this.isChapter4Sub4Active = false;      
      this.isChapter4Sub5Active = false;  
      this.Chapter4();    
    }
  }

  toggleChapter4Sub2Topics(){    
    if (!this.isChapter4Sub2Active) {    
      this.isChapter4Sub1Active = false;      
      this.isChapter4Sub2Active = true;      
      this.isChapter4Sub3Active = false;
      this.isChapter4Sub4Active = false;      
      this.isChapter4Sub5Active = false;      
      this.Chapter4();    
    }
  }

  toggleChapter4Sub3Topics(){    
    if (!this.isChapter4Sub3Active) {    
      this.isChapter4Sub1Active = false;      
      this.isChapter4Sub2Active = false;       
      this.isChapter4Sub3Active = true;
      this.isChapter4Sub4Active = false;      
      this.isChapter4Sub5Active = false;      
      this.Chapter4();    
    }
  }

  toggleChapter4Sub4Topics(){    
    if (!this.isChapter4Sub4Active) {    
      this.isChapter4Sub1Active = false;      
      this.isChapter4Sub2Active = false;       
      this.isChapter4Sub3Active = false;
      this.isChapter4Sub4Active = true;      
      this.isChapter4Sub5Active = false;      
      this.Chapter4();    
    }
  }

  toggleChapter4Sub5Topics(){
    if (!this.isChapter4Sub5Active) {    
      this.isChapter4Sub1Active = false;      
      this.isChapter4Sub2Active = false;       
      this.isChapter4Sub3Active = false;
      this.isChapter4Sub4Active = false;      
      this.isChapter4Sub5Active = true;      
      this.Chapter4();    
    }
  }

  Chapter4(){
    this.isChapter1Active = false;
      this.isChapter2Active = false; 
      this.isChapter3Active = false;
      this.isChapter4Active = true; 
      this.isChapter5Active = false;
      this.isChapter6Active = false;
      this.isChapter7Active = false;
      this.isChapter8Active = false;
      this.isChapter9Active = false;

    this.isChapter1Sub1Active = false;
      this.isChapter1Sub2Active = false;
      this.isChapter1Sub3Active = false;
      this.isChapter1Sub4Active = false;
      this.isChapter1Sub5Active = false;
      this.isChapter1Sub6Active = false;

      this.isChapter2Sub1Active = false;
      this.isChapter2Sub2Active = false;
      this.isChapter2Sub3Active = false;
      this.isChapter2Sub4Active = false;

      this.isChapter3Sub1Active = false;
      this.isChapter3Sub2Active = false;
      this.isChapter3Sub3Active = false;
      this.isChapter3Sub4Active = false;      

      this.isChapter5Sub1Active = false;
      this.isChapter5Sub2Active = false;
      this.isChapter5Sub3Active = false;

      this.isChapter6Sub1Active = false;
      this.isChapter6Sub2Active = false;
      this.isChapter6Sub3Active = false;

      this.isChapter7Sub1Active = false;
      this.isChapter7Sub2Active = false;
      this.isChapter7Sub3Active = false;   
      this.isChapter7Sub4Active = false;

      this.isChapter8Sub1Active = false;
      this.isChapter8Sub2Active = false;
      this.isChapter8Sub3Active = false;   
      this.isChapter8Sub4Active = false;       
      this.isChapter8Sub5Active = false; 

      this.isChapter9Sub1Active = false;
      this.isChapter9Sub2Active = false;
      this.isChapter9Sub3Active = false;
  }

  //Chapter 5 ----------------------------------------------------------------

  toggleChapter5Topics() {
    this.showChapter5Topics = !this.showChapter5Topics;
    if(!this.isChapter5Active){
      this.isChapter1Active = false;
      this.isChapter2Active = false;
      this.isChapter3Active = false;
      this.isChapter4Active = false;
      this.isChapter5Active = true;
      this.isChapter6Active = false;
      this.isChapter7Active = false;
      this.isChapter8Active = false;
      this.isChapter9Active = false;
      this.Chapter5();
    }
  }

  toggleChapter5Sub1Topics(){
    if (!this.isChapter5Sub1Active) {
      this.isChapter5Sub1Active = true;
      this.isChapter5Sub2Active = false;
      this.isChapter5Sub3Active = false;    
      this.Chapter5();  
    }
  }

  toggleChapter5Sub2Topics(){    
    if (!this.isChapter5Sub2Active) {    
      this.isChapter5Sub1Active = false;      
      this.isChapter5Sub2Active = true;      
      this.isChapter5Sub3Active = false;      
      this.Chapter5();  
    }
  }

  toggleChapter5Sub3Topics(){    
    if (!this.isChapter5Sub3Active) {    
      this.isChapter5Sub1Active = false;      
      this.isChapter5Sub2Active = false;       
      this.isChapter5Sub3Active = true;      
      this.Chapter5();  
    }
  }

  Chapter5(){
    this.isChapter1Active = false;
      this.isChapter2Active = false; 
      this.isChapter3Active = false;
      this.isChapter4Active = false;
      this.isChapter5Active = true;
      this.isChapter6Active = false;
      this.isChapter7Active = false;
      this.isChapter8Active = false;
      this.isChapter9Active = false;

    this.isChapter1Sub1Active = false;
      this.isChapter1Sub2Active = false;
      this.isChapter1Sub3Active = false;
      this.isChapter1Sub4Active = false;
      this.isChapter1Sub5Active = false;
      this.isChapter1Sub6Active = false;

      this.isChapter2Sub1Active = false;
      this.isChapter2Sub2Active = false;
      this.isChapter2Sub3Active = false;
      this.isChapter2Sub4Active = false;

      this.isChapter3Sub1Active = false;
      this.isChapter3Sub2Active = false;
      this.isChapter3Sub3Active = false;
      this.isChapter3Sub4Active = false;      

      this.isChapter4Sub1Active = false;
      this.isChapter4Sub2Active = false;
      this.isChapter4Sub3Active = false;
      this.isChapter4Sub4Active = false;
      this.isChapter4Sub5Active = false;

      this.isChapter6Sub1Active = false;
      this.isChapter6Sub2Active = false;
      this.isChapter6Sub3Active = false;

      this.isChapter7Sub1Active = false;
      this.isChapter7Sub2Active = false;
      this.isChapter7Sub3Active = false;   
      this.isChapter7Sub4Active = false;

      this.isChapter8Sub1Active = false;
      this.isChapter8Sub2Active = false;
      this.isChapter8Sub3Active = false;   
      this.isChapter8Sub4Active = false;       
      this.isChapter8Sub5Active = false; 

      this.isChapter9Sub1Active = false;
      this.isChapter9Sub2Active = false;
      this.isChapter9Sub3Active = false;
  }


  //Chapter 6 ----------------------------------------------------------------

  toggleChapter6Topics() {
    this.showChapter6Topics = !this.showChapter6Topics;
    if(!this.isChapter6Active){
      this.isChapter1Active = false;
      this.isChapter2Active = false;
      this.isChapter3Active = false;
      this.isChapter4Active = false;
      this.isChapter5Active = false;
      this.isChapter6Active = true;
      this.isChapter7Active = false;
      this.isChapter8Active = false;
      this.isChapter9Active = false;
      this.Chapter6();
    }
  }

  toggleChapter6Sub1Topics(){
    if (!this.isChapter6Sub1Active) {
      this.isChapter6Sub1Active = true;
      this.isChapter6Sub2Active = false;
      this.isChapter6Sub3Active = false; 
      this.Chapter6();     
    }
  }

  toggleChapter6Sub2Topics(){    
    if (!this.isChapter6Sub2Active) {    
      this.isChapter6Sub1Active = false;      
      this.isChapter6Sub2Active = true;      
      this.isChapter6Sub3Active = false;      
      this.Chapter6();     
    }
  }

  toggleChapter6Sub3Topics(){    
    if (!this.isChapter6Sub3Active) {    
      this.isChapter6Sub1Active = false;      
      this.isChapter6Sub2Active = false;       
      this.isChapter6Sub3Active = true;      
      this.Chapter6();     
    }
  }

  Chapter6(){
    this.isChapter1Active = false;
      this.isChapter2Active = false; 
      this.isChapter3Active = false;
      this.isChapter4Active = false;
      this.isChapter5Active = false;
      this.isChapter6Active = true;
      this.isChapter7Active = false;
      this.isChapter8Active = false;
      this.isChapter9Active = false;

    this.isChapter1Sub1Active = false;
      this.isChapter1Sub2Active = false;
      this.isChapter1Sub3Active = false;
      this.isChapter1Sub4Active = false;
      this.isChapter1Sub5Active = false;
      this.isChapter1Sub6Active = false;

      this.isChapter2Sub1Active = false;
      this.isChapter2Sub2Active = false;
      this.isChapter2Sub3Active = false;
      this.isChapter2Sub4Active = false;

      this.isChapter3Sub1Active = false;
      this.isChapter3Sub2Active = false;
      this.isChapter3Sub3Active = false;
      this.isChapter3Sub4Active = false;      

      this.isChapter4Sub1Active = false;
      this.isChapter4Sub2Active = false;
      this.isChapter4Sub3Active = false;
      this.isChapter4Sub4Active = false;
      this.isChapter4Sub5Active = false;

      this.isChapter5Sub1Active = false;
      this.isChapter5Sub2Active = false;
      this.isChapter5Sub3Active = false;

      this.isChapter7Sub1Active = false;
      this.isChapter7Sub2Active = false;
      this.isChapter7Sub3Active = false;   
      this.isChapter7Sub4Active = false;

      this.isChapter8Sub1Active = false;
      this.isChapter8Sub2Active = false;
      this.isChapter8Sub3Active = false;   
      this.isChapter8Sub4Active = false;       
      this.isChapter8Sub5Active = false; 

      this.isChapter9Sub1Active = false;
      this.isChapter9Sub2Active = false;
      this.isChapter9Sub3Active = false;
  }

  //Chapter 7 ----------------------------------------------------------------

  toggleChapter7Topics() {
    this.showChapter7Topics = !this.showChapter7Topics;
    if(!this.isChapter7Active){
      this.isChapter1Active = false;
      this.isChapter2Active = false;
      this.isChapter3Active = false;
      this.isChapter4Active = false;
      this.isChapter5Active = false;
      this.isChapter6Active = false;
      this.isChapter7Active = true;
      this.isChapter8Active = false;
      this.isChapter9Active = false;
      this.Chapter7();
    }
  }

  toggleChapter7Sub1Topics(){
    if (!this.isChapter7Sub1Active) {
      this.isChapter7Sub1Active = true;
      this.isChapter7Sub2Active = false;
      this.isChapter7Sub3Active = false;   
      this.isChapter7Sub4Active = false;
      this.Chapter7();      
    }
  }

  toggleChapter7Sub2Topics(){    
    if (!this.isChapter7Sub2Active) {    
      this.isChapter7Sub1Active = false;      
      this.isChapter7Sub2Active = true;
      this.isChapter7Sub3Active = false;   
      this.isChapter7Sub4Active = false;       
      this.Chapter7();      
    }
  }

  toggleChapter7Sub3Topics(){    
    if (!this.isChapter7Sub3Active) {    
      this.isChapter7Sub1Active = false;      
      this.isChapter7Sub2Active = false;       
      this.isChapter7Sub3Active = true;  
      this.isChapter7Sub4Active = false;       
      this.Chapter7();      
    }
  }

  toggleChapter7Sub4Topics(){    
    if (!this.isChapter7Sub4Active) {    
      this.isChapter7Sub1Active = false;      
      this.isChapter7Sub2Active = false;       
      this.isChapter7Sub3Active = false;      
      this.isChapter7Sub4Active = true;      
      this.Chapter7();      
    }
  }

  Chapter7(){
    this.isChapter1Active = false;
      this.isChapter2Active = false; 
      this.isChapter3Active = false;
      this.isChapter4Active = false;
      this.isChapter5Active = false;
      this.isChapter6Active = false;
      this.isChapter7Active = true;
      this.isChapter8Active = false;
      this.isChapter9Active = false;

    this.isChapter1Sub1Active = false;
      this.isChapter1Sub2Active = false;
      this.isChapter1Sub3Active = false;
      this.isChapter1Sub4Active = false;
      this.isChapter1Sub5Active = false;
      this.isChapter1Sub6Active = false;

      this.isChapter2Sub1Active = false;
      this.isChapter2Sub2Active = false;
      this.isChapter2Sub3Active = false;
      this.isChapter2Sub4Active = false;

      this.isChapter3Sub1Active = false;
      this.isChapter3Sub2Active = false;
      this.isChapter3Sub3Active = false;
      this.isChapter3Sub4Active = false;      

      this.isChapter4Sub1Active = false;
      this.isChapter4Sub2Active = false;
      this.isChapter4Sub3Active = false;
      this.isChapter4Sub4Active = false;
      this.isChapter4Sub5Active = false;

      this.isChapter5Sub1Active = false;
      this.isChapter5Sub2Active = false;
      this.isChapter5Sub3Active = false;

      this.isChapter6Sub1Active = false;
      this.isChapter6Sub2Active = false;
      this.isChapter6Sub3Active = false;   

      this.isChapter8Sub1Active = false;
      this.isChapter8Sub2Active = false;
      this.isChapter8Sub3Active = false;   
      this.isChapter8Sub4Active = false;       
      this.isChapter8Sub5Active = false; 

      this.isChapter9Sub1Active = false;
      this.isChapter9Sub2Active = false;
      this.isChapter9Sub3Active = false;
  }


  //Chapter 8 ----------------------------------------------------------------

  toggleChapter8Topics() {
    this.showChapter8Topics = !this.showChapter8Topics;
    if(!this.isChapter8Active){
      this.isChapter1Active = false;
      this.isChapter2Active = false;
      this.isChapter3Active = false;
      this.isChapter4Active = false;
      this.isChapter5Active = false;
      this.isChapter6Active = false;
      this.isChapter7Active = false;
      this.isChapter8Active = true;
      this.isChapter9Active = false;
      this.Chapter8();
    }
  }

  toggleChapter8Sub1Topics(){
    if (!this.isChapter8Sub1Active) {
      this.isChapter8Sub1Active = true;
      this.isChapter8Sub2Active = false;
      this.isChapter8Sub3Active = false;   
      this.isChapter8Sub4Active = false;       
      this.isChapter8Sub5Active = false;  
      this.Chapter8();     
    }
  }

  toggleChapter8Sub2Topics(){    
    if (!this.isChapter8Sub2Active) {    
      this.isChapter8Sub1Active = false;      
      this.isChapter8Sub2Active = true;      
      this.isChapter8Sub3Active = false;   
      this.isChapter8Sub4Active = false;       
      this.isChapter8Sub5Active = false;       
      this.Chapter8();     
    }
  }

  toggleChapter8Sub3Topics(){    
    if (!this.isChapter8Sub3Active) {    
      this.isChapter8Sub1Active = false;      
      this.isChapter8Sub2Active = false;       
      this.isChapter8Sub3Active = true;  
      this.isChapter8Sub4Active = false;  
      this.isChapter8Sub5Active = false;       
      this.Chapter8();     
    }
  }

  toggleChapter8Sub4Topics(){    
    if (!this.isChapter8Sub4Active) {    
      this.isChapter8Sub1Active = false;      
      this.isChapter8Sub2Active = false;       
      this.isChapter8Sub3Active = false;      
      this.isChapter8Sub4Active = true;     
      this.isChapter8Sub5Active = false;       
      this.Chapter8();     
    }
  }

  toggleChapter8Sub5Topics(){    
    if (!this.isChapter8Sub5Active) {    
      this.isChapter8Sub1Active = false;      
      this.isChapter8Sub2Active = false;       
      this.isChapter8Sub3Active = false;      
      this.isChapter8Sub4Active = false;      
      this.isChapter8Sub5Active = true;       
      this.Chapter8();     
    }
  }

  Chapter8(){
    this.isChapter1Active = false;
      this.isChapter2Active = false; 
      this.isChapter3Active = false;
      this.isChapter4Active = false;
      this.isChapter5Active = false;
      this.isChapter6Active = false;
      this.isChapter7Active = false;
      this.isChapter8Active = true;
      this.isChapter9Active = false;

    this.isChapter1Sub1Active = false;
      this.isChapter1Sub2Active = false;
      this.isChapter1Sub3Active = false;
      this.isChapter1Sub4Active = false;
      this.isChapter1Sub5Active = false;
      this.isChapter1Sub6Active = false;

      this.isChapter2Sub1Active = false;
      this.isChapter2Sub2Active = false;
      this.isChapter2Sub3Active = false;
      this.isChapter2Sub4Active = false;

      this.isChapter3Sub1Active = false;
      this.isChapter3Sub2Active = false;
      this.isChapter3Sub3Active = false;
      this.isChapter3Sub4Active = false;      

      this.isChapter4Sub1Active = false;
      this.isChapter4Sub2Active = false;
      this.isChapter4Sub3Active = false;
      this.isChapter4Sub4Active = false;
      this.isChapter4Sub5Active = false;

      this.isChapter5Sub1Active = false;
      this.isChapter5Sub2Active = false;
      this.isChapter5Sub3Active = false;

      this.isChapter6Sub1Active = false;
      this.isChapter6Sub2Active = false;
      this.isChapter6Sub3Active = false;   

      this.isChapter7Sub1Active = false;
      this.isChapter7Sub2Active = false;
      this.isChapter7Sub3Active = false;   
      this.isChapter7Sub4Active = false;       

      this.isChapter9Sub1Active = false;
      this.isChapter9Sub2Active = false;
      this.isChapter9Sub3Active = false;
  }


  //Chapter 9 ----------------------------------------------------------------

  toggleChapter9Topics() {
    this.showChapter9Topics = !this.showChapter9Topics;    
    if(!this.isChapter9Active){
      this.isChapter1Active = false;
      this.isChapter2Active = false;
      this.isChapter3Active = false;
      this.isChapter4Active = false;
      this.isChapter5Active = false;
      this.isChapter6Active = false;
      this.isChapter7Active = false;
      this.isChapter8Active = false;
      this.isChapter9Active = true;
      this.Chapter9();
    }
  }

  toggleChapter9Sub1Topics(){
    if (!this.isChapter9Sub1Active) {
      this.isChapter9Sub1Active = true;
      this.isChapter9Sub2Active = false;
      this.isChapter9Sub3Active = false;
      this.Chapter9();                
    }
  }

  toggleChapter9Sub2Topics(){    
    if (!this.isChapter9Sub2Active) {    
      this.isChapter9Sub1Active = false;      
      this.isChapter9Sub2Active = true;      
      this.isChapter9Sub3Active = false;                
      this.Chapter9();                
    }
  }

  toggleChapter9Sub3Topics(){    
    if (!this.isChapter9Sub3Active) {    
      this.isChapter9Sub1Active = false;      
      this.isChapter9Sub2Active = false;       
      this.isChapter9Sub3Active = true;               
      this.Chapter9();                
    }
  }

  Chapter9(){
    this.isChapter1Active = false;
      this.isChapter2Active = false; 
      this.isChapter3Active = false;
      this.isChapter4Active = false;
      this.isChapter5Active = false;
      this.isChapter6Active = false;
      this.isChapter7Active = false;
      this.isChapter8Active = false;
      this.isChapter9Active = true;

    this.isChapter1Sub1Active = false;
      this.isChapter1Sub2Active = false;
      this.isChapter1Sub3Active = false;
      this.isChapter1Sub4Active = false;
      this.isChapter1Sub5Active = false;
      this.isChapter1Sub6Active = false;

      this.isChapter2Sub1Active = false;
      this.isChapter2Sub2Active = false;
      this.isChapter2Sub3Active = false;
      this.isChapter2Sub4Active = false;

      this.isChapter3Sub1Active = false;
      this.isChapter3Sub2Active = false;
      this.isChapter3Sub3Active = false;
      this.isChapter3Sub4Active = false;      

      this.isChapter4Sub1Active = false;
      this.isChapter4Sub2Active = false;
      this.isChapter4Sub3Active = false;
      this.isChapter4Sub4Active = false;
      this.isChapter4Sub5Active = false;

      this.isChapter5Sub1Active = false;
      this.isChapter5Sub2Active = false;
      this.isChapter5Sub3Active = false;

      this.isChapter6Sub1Active = false;
      this.isChapter6Sub2Active = false;
      this.isChapter6Sub3Active = false;   

      this.isChapter7Sub1Active = false;
      this.isChapter7Sub2Active = false;
      this.isChapter7Sub3Active = false;   
      this.isChapter7Sub4Active = false;       

      this.isChapter8Sub1Active = false;
      this.isChapter8Sub2Active = false;
      this.isChapter8Sub3Active = false;
      this.isChapter8Sub4Active = false;
      this.isChapter8Sub5Active = false;
  }  

  CheckAttackVectorsTest001(email: string) {
    this.auth.isacttest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/attack-surfaces-and-its-types/attack-vectors']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckAttackSurfacesTest001(email: string) {
    this.auth.isacttest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/attack-surfaces-and-its-types/attack-surfaces']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckTypesAttackSurfacesTest001(email: string) {
    this.auth.isacttest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/attack-surfaces-and-its-types/types-of-attack-surfaces']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckattacksurfacelimitedTest001(email: string) {
    this.auth.isacttest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/attack-surfaces-and-its-types/attack-surfaces-limited']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }


  //Phishing Spoofing
  CheckPhishingSpoofingTypes(email: string) {
    this.auth.attackcurfacestest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/phishing-spoofing-and-its-types/phishing']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckSpoofingTypes(email: string) {
    this.auth.attackcurfacestest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/phishing-spoofing-and-its-types/spoofing']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckRansonware(email: string) {
    this.auth.attackcurfacestest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/phishing-spoofing-and-its-types/ransomware']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckWifiSecurity(email: string) {
    this.auth.attackcurfacestest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/phishing-spoofing-and-its-types/wifi-security']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }



  //Wireless Environment
  CheckAttacksWireless(email: string) {
    this.auth.phishingspoofingtest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/wireless-environment-scams-and-precautions/attacks-on-wireless-environment']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckGuidelines(email: string) {
    this.auth.phishingspoofingtest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/wireless-environment-scams-and-precautions/secure-wireless-communications']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckScams(email: string) {
    this.auth.phishingspoofingtest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/wireless-environment-scams-and-precautions/scams']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckPrecautions(email: string) {
    this.auth.phishingspoofingtest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/wireless-environment-scams-and-precautions/precautions']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckSecurity(email: string) {
    this.auth.phishingspoofingtest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/wireless-environment-scams-and-precautions/desktop-security']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }



  //Wireless Environment
  CheckPractices(email: string) {
    this.auth.wirelessenvtest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/dos-and-donts/practices-to-follow']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckDos(email: string) {
    this.auth.wirelessenvtest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/dos-and-donts/dos']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckDonts(email: string) {
    this.auth.wirelessenvtest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/dos-and-donts/donts']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }


  //Dos and Donts
  CheckIR(email: string) {
    this.auth.dosanddontstest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/IR-management/incident-response-management']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckPhases(email: string) {
    this.auth.dosanddontstest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/IR-management/phases-of-incident-response-management']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }


  CheckRole(email: string) {
    this.auth.dosanddontstest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/IR-management/role-of-incident-response-manager']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }


  // Incident Response Management
  CheckDataProtection(email: string) {
    this.auth.irmngmnttest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/data/data-protection']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckProtection(email: string) {
    this.auth.irmngmnttest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/data/data-protection-measures']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckTarget(email: string) {
    this.auth.irmngmnttest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/data/hackers-generally-target']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckTools(email: string) {
    this.auth.irmngmnttest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/data/tools-and-technologies']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }



  //Data Protection
  CheckDNS(email: string) {
    this.auth.dataprotecttest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/dns-and-apt-attacks/dns-attacks']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckAPT(email: string) {
    this.auth.dataprotecttest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/dns-and-apt-attacks/apt-attacks']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckSQL(email: string) {
    this.auth.dataprotecttest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/dns-and-apt-attacks/sql-injection']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckExploit(email: string) {
    this.auth.dataprotecttest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/dns-and-apt-attacks/attackers-exploitation']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckMIM(email: string) {
    this.auth.dataprotecttest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/dns-and-apt-attacks/man-in-the-middle-attack']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }


  //DNS & APT attacks
  CheckCyber(email: string) {
    this.auth.dnsapttest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/cyberstalking-and-cyberbullying/ddos']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckCStalk(email: string) {
    this.auth.dnsapttest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/cyberstalking-and-cyberbullying/cyberstalking']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  CheckPrevention(email: string) {
    this.auth.dnsapttest001check(email)
      .subscribe({
        next: (response) => {
          this.router.navigate(['courses/cs001/cyberstalking-and-cyberbullying/cyberstalking-cyberbullying-prevention']);
        },
        error: (error) => {
          this.toastr.error(error?.error.message);
          this.toastr.warning('Mandatory to Complete the previous Chapter', 'Warning');
        }
      });
  }

  toggleDrawer() {
    this.drawerState = this.drawerState === 'closed' ? 'open' : 'closed';
  }

  logout() {
    this.auth.signOut();
  }
}
