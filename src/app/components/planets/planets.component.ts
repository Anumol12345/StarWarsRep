import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  page:any=1;
  planets:any =[];
  loading = true;
  
  FstPageData: any;
  apiUrl: any;
  constructor(private router :Router , private serverservice: ServerService ,private activatedRoute:ActivatedRoute){

    this.activatedRoute.queryParams.subscribe((params) => {
      if(params["page"]){
        this.page = params["page"];
      }
      
    });

  }
   ngOnInit() {
    this.apiUrl = "https://swapi.dev/api/planets/?page="+this.page
    this.getData();
   
  }

  //To get next page data
  nextPage(){
   
    this.page++;
    this.apiUrl = this.planets.next;
    this.getData();
  }

  //To get previous page data
  prevPage(){
    this.page--;
    this.apiUrl = this.planets.previous ;
    this.getData();
  }

  //To redirect to residents list page
  toResidents(resdata){
   let url =  resdata.url.split("/");
   const id = url[url.length - 2];

  
    this.router.navigate(["residents"],{queryParams:{
     planetId:id, page: this.page 
    },});
    
  }

  //To get planet data
 getData(){
  this.loading = true;
  this.serverservice.callService( this.apiUrl ).subscribe((data)=>{
    this.loading = false;
    console.log(data);
    this.planets =  data
    this.FstPageData = this.planets.results;
    
  });

}

}
