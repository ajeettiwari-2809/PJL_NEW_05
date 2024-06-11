// import { Component } from '@angular/core';
import { Component, OnInit, ChangeDetectorRef, Renderer2,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit,OnDestroy{

  constructor(private cdr: ChangeDetectorRef,private renderer: Renderer2) {}
   scriptsLoaded:boolean=false;
   isrefresh:boolean=false;
  private scriptElements: HTMLScriptElement[] = [];
  ngOnInit() {
    
this.isrefresh=false;
   
    

    // if (this.scriptsLoaded) {
    //   // this.loadScript('assets/newcss/vendors/base/vendor.bundle.base.js');
    // this.loadScript('assets/newcss/vendors/chart.js/Chart.min.js');
    // this.loadScript('assets/newcss/js/jquery.cookie.js');
    // this.loadScript('assets/newcss/js/off-canvas.js');
    // this.loadScript('assets/newcss/js/hoverable-collapse.js');
    // this.loadScript('assets/newcss/js/template.js');
    // this.loadScript('assets/newcss/js/todolist.js');
    // this.loadScript('assets/newcss/js/dashboard.js');
    //   this.scriptsLoaded = true;
    // } 

   




  }
  reloadWindow()
  {
    

      window.location.reload();
     
    this.isrefresh=true;
  }
 
  ngOnDestroy(): void {
    console.log("CALL");
    this.scriptElements.forEach(script => this.renderer.removeChild(document.body, script));
    this.scriptsLoaded = false;
  }
  // loadScript(src: string): void {
  //   const script = this.renderer.createElement('script');
  //   script.src = src;
  //   script.type = 'text/javascript';
  //   script.async = true;
  //   this.renderer.appendChild(document.body, script);
  // }



  loadScript(src: string, onLoadCallback?: () => void): void {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    if (onLoadCallback) {
      script.onload = onLoadCallback;
    }
    this.renderer.appendChild(document.body, script);
    this.scriptElements.push(script);
  }
  reloadComponent() {
    console.log('refresh')
    // Any logic to reload data or reset component state
    // window.location.reload();
    // this.cdr.detectChanges();
  }

  
  
}
