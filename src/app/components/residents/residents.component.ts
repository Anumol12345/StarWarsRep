
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss']
})
export class ResidentsComponent implements OnInit {
  apiUrl:any = "https://swapi.dev/api/planets/";
  planetId: any;
  page: any;
  loading = true;
  resArray: any=[];
  ResArray: any=[];
  constructor(private activatedRoute: ActivatedRoute ,private router :Router,
    private serverservice: ServerService) {  
    this.activatedRoute.queryParams.subscribe((params) => {
    this.planetId = params["planetId"];
    this.page = params["page"];
  });}

  ngOnInit(): void {
    this.getResidents();
  }

  //To get residence list of planet
  getResidents(){
    this.serverservice.callService( this.apiUrl + this.planetId).subscribe((data:any)=>{
      
        var DataAr = data.residents;
        if( DataAr.length > 0){

         for(var i =0 ;i < DataAr.length;i++){
          var url = DataAr[i].split("/");
          var id = url[url.length - 2];
           this.getRes(DataAr[i] ,id);
         }
          setTimeout(() => {
            this.resArray.sort(function(a, b) { 
              return a.id - b.id ;
            });
            this.ResArray = this.resArray;
            this.loading = false;
          }, 800);
        }

        else{
          this.loading = false;
        }
     
      });
  }
  
  //To get residence data
  getRes(element:any , id:any) {
    this.serverservice.callService(element).subscribe((data) => {
      this.resArray.push({
        id:id,
        data:data
      });

   })
  }


  //Back to planet page
  backTo(){
    this.router.navigate(["planets"],{queryParams:{
      page: this.page
    },});
  }
  
}
