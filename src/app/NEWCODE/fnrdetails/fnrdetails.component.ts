import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-fnrdetails',
  templateUrl: './fnrdetails.component.html',
  styleUrls: ['./fnrdetails.component.css']
})
export class FNRDETAILSComponent implements OnInit{

constructor(private authservice:AuthService,private http: HttpClient,private spinner: NgxSpinnerService,private router: Router,private route: ActivatedRoute,)
{}
VehicleType:any=[];

zonecode?:String;
  ngOnInit(): void {
    this.getRecord();
    this.zonecode= this.route.snapshot.params['id'];
  }
   baseUrl:String = this.authservice.baseUrl;
  filteredRecords:any=[];


  getRecord()
  {
    this.spinner.show();
   const apiUrl=this.baseUrl+ 'Users/getFOIS_DetailByZone';

   this.http.post(apiUrl, { "input": 0,
    "inputString": "EasternUP" }).subscribe((data: any) => {
    this.spinner.hide();

    this.filteredRecords=data;

  });

    // this.filteredRecords = [
    //   {
    //     id: 3,
    //     fnrNo: "24073102694",
    //     uniqNo: "24073102694",
    //     sourceDateTime: "Jul 31 2024  4:03PM",
    //     sourceLat: 24.5700754,
    //     sourcLong: 80.9987201,
    //     stationFrom: "PRISM JOHNSON LIMITED(PCIH)",
    //     destinationLat: 24.579716,
    //     destinationLong: 80.832176,
    //     stationTo: "ALAMNAGAR(AMG)",
    //     currentStatus: "ARRIVED AT GOLA GOKARANNATH(GK) ON 11:00 05-08-2024",
    //     remark: null,
    //     zoneCode: "EasternUP",
    //     colorCode: "Red"
    //   },
    //   // Add more records here
    // ];
  }

  getBack()
  {
    window.history.back();
  }
}
