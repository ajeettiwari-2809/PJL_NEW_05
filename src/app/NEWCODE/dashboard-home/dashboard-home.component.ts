// import { Component } from '@angular/core';
import { Component, OnInit, ChangeDetectorRef, Renderer2,OnDestroy } from '@angular/core';
import { ChartType, ChartData, ChartOptions } from 'chart.js';
import { SidebarService } from 'src/app/services/sidebar.service';

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


this.initializeChartData();


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


  updatechart()
  {

  }
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 20, // Set the border radius here
      }
    }
  };



  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: this.pieChartLabels,
    datasets: [{
      data: [300, 500, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }]
  };

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  initializeChartData() {
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [{
        data: [300, 500, 100]
      }]
    };
  }
  isSidebarMinimized = false;






}
