import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';
import { ClientServiceService,Client } from './../../../Services/client-service.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-cmes-rdv',
  templateUrl: './cmes-rdv.page.html',
  styleUrls: ['./cmes-rdv.page.scss'],
})
export class CmesRDVPage implements OnInit {
Cuser:Client[];
  constructor(private menu:MenuController,private CS:ClientServiceService,private storage:Storage) { }
  sub:Subscription;
  ngOnInit() {
    this.storage.get('Email').then((val)=>{
     this.sub= this.CS.ClientExist(val).subscribe((res)=>{
       this.Cuser=res;
       console.log(val);
       this.bubbleSort();
      });
    });
  }
  bubbleSort(){
    
    if(this.Cuser[0].mesRDV[0]!=undefined){
for (let z = 0; z < this.Cuser[0].mesRDV.length; z++) {
     var len = this.Cuser[0].mesRDV[z].ClientsRDVs.length;
     for (var i = len-1; i>=0; i--){
       for(var j = 1; j<=i; j++){
         if( this.calculateminutes(this.Cuser[0].mesRDV[z].ClientsRDVs[j-1].tempsRDV.hour,this.Cuser[0].mesRDV[z].ClientsRDVs[j-1].tempsRDV.hour)
           <this.calculateminutes(this.Cuser[0].mesRDV[z].ClientsRDVs[j].tempsRDV.hour,this.Cuser[0].mesRDV[z].ClientsRDVs[j].tempsRDV.minute)
           ){
             var temp = this.Cuser[0].mesRDV[z].ClientsRDVs[j-1];
             this.Cuser[0].mesRDV[z].ClientsRDVs[j-1] = this.Cuser[0].mesRDV[z].ClientsRDVs[j];
             this.Cuser[0].mesRDV[z].ClientsRDVs[j] = temp;
          }
       }
     }
     this.Cuser[0].mesRDV[z].ClientsRDVs.reverse();
    }
    this.Cuser[0].mesRDV.reverse();
   }
  }
  calculsom(id,id2){
    var sum:number=0;
    for (let i = 0; i < this.Cuser[0].mesRDV[id].ClientsRDVs[id2].Service.length; i++) {
      sum=Number(this.Cuser[0].mesRDV[id].ClientsRDVs[id2].Service[i].Cout)+sum;
      
    }
    return sum;

  }
  calculateminutes(hour:number,minute:number)
  {
    return (hour*60)+minute;
  }
 ionViewWillLeave(){
    this.menu.close();
   }
   ngOnDestroy() {
   if(this.sub!=undefined)
   {if(!this.sub.closed)
     {this.sub.unsubscribe();}
   }

   }
   }

