import { notification, NotificationService } from './../../../Services/notification.service';
import { professional, ProfessionnelService } from 'src/app/Services/professionnel.service';
import { ClientServiceService } from 'src/app/Services/client-service.service';
import { Client } from './../../../Services/client-service.service';
import { Storage } from '@ionic/storage';

import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {  Subscription } from 'rxjs';
import swal from 'sweetalert';
@Component({
  selector: 'app-myrdv',
  templateUrl: './myrdv.page.html',
  styleUrls: ['./myrdv.page.scss'],
})
export class MyrdvPage implements OnInit {
Cuser:Client[];
noRDV=false;
Puser:professional[]
sub:Subscription;
x:any;
month:number=Number(new Date().getMonth())+1;
  day:number=new Date().getDate();
  year:number=new Date().getFullYear();
  date:any=this.year+'-'+this.month+'-'+this.day;
sub2:Subscription;
distance=0;
notif:notification
  constructor(private nav:NavController,private NS:NotificationService,private PS:ProfessionnelService,private menu:MenuController,private CS:ClientServiceService,private storage:Storage) { }

  ngOnInit() {

    
    clearInterval();
    
    this.storage.get('Email').then((val)=>{
      this.sub2=this.CS.ClientExist(val).subscribe((res)=>{
        if(this.month<10&&Number(this.day)<10){
          this.date=this.year+'-'+'0'+this.month+'-'+'0'+this.day
        }
       else if(Number(this.day)<10)
        {
          this.date=this.year+'-'+this.month+'-'+'0'+this.day
          
        }
       else if(this.month<10)
        {this.date=this.year+'-'+'0'+this.month+'-'+this.day}
       this.Cuser=res;
       if(res[0].mesRDV!=undefined)
       { console.log(res[0].mesRDV.length);
         if(res[0].mesRDV.length==0){
          clearInterval(this.x);
          console.log('here')
          this.noRDV=true;
        console.log(this.noRDV);
    
          this.countdown(1991,1,1,1,1);
       }
       else  if(res[0].mesRDV[res[0].mesRDV.length-1].Date==this.date)
       { var X=new Date(res[0].mesRDV[res[0].mesRDV.length-1].Date)
           if(res[0].mesRDV[res[0].mesRDV.length-1].ClientsRDVs[0].tempsRDV.hour<new Date().getHours())
           {clearInterval(this.x);
             this.noRDV=true;
             console.log('here')
           console.log(this.noRDV);
       
             this.countdown(1991,1,1,1,1);
           }
           else if(res[0].mesRDV[res[0].mesRDV.length-1].ClientsRDVs[0].tempsRDV.hour==new Date().getHours())
          {  console.log('here');
            if(res[0].mesRDV[res[0].mesRDV.length-1].ClientsRDVs[0].tempsRDV.minute<new Date().getMinutes()){
             clearInterval(this.x);
             this.noRDV=true;
             console.log('here')
             console.log(this.noRDV);
               this.countdown(1991,1,1,1,1);
          }
          else{
            clearInterval(this.x);
            this.noRDV=false;
            console.log('here')
         console.log(this.noRDV);
       
           this.countdown(X.getFullYear(),X.getMonth(),X.getDate(),res[0].mesRDV[res[0].mesRDV.length-1].ClientsRDVs[0].tempsRDV.hour,res[0].mesRDV[res[0].mesRDV.length-1].ClientsRDVs[0].tempsRDV.minute);
         
          }
         }else{
           console.log(res[0].mesRDV[res[0].mesRDV.length-1]);
           clearInterval(this.x);
           this.noRDV=false;
           console.log('here')
        console.log(this.noRDV);
      
          this.countdown(X.getFullYear(),X.getMonth(),X.getDate(),res[0].mesRDV[res[0].mesRDV.length-1].ClientsRDVs[0].tempsRDV.hour,res[0].mesRDV[res[0].mesRDV.length-1].ClientsRDVs[0].tempsRDV.minute);
        
         }
        
     }
       else if(new Date(res[0].mesRDV[res[0].mesRDV.length-1].Date)>new Date(this.date))
      { var X=new Date(res[0].mesRDV[res[0].mesRDV.length-1].Date)

        console.log(res[0].mesRDV[res[0].mesRDV.length-1].Date);
        console.log(this.date);
        console.log('here')
        console.log(this.date==res[0].mesRDV[res[0].mesRDV.length-1].Date)
        console.log(this.date==res[0].mesRDV[res[0].mesRDV.length-1].Date)
       clearInterval(this.x);
       this.noRDV=false;
    

      this.countdown(X.getFullYear(),X.getMonth(),X.getDate(),res[0].mesRDV[res[0].mesRDV.length-1].ClientsRDVs[0].tempsRDV.hour,res[0].mesRDV[res[0].mesRDV.length-1].ClientsRDVs[0].tempsRDV.minute);
    }
  

    else{
      console.log('here')
      
      clearInterval(this.x);
      this.noRDV=true;
    console.log(this.noRDV);

      this.countdown(1991,1,1,1,1);
     } 
    }
    else{
  
      console.log('here')
      res[0].mesRDV=new Array();
      clearInterval(this.x);
      this.noRDV=true;
    console.log(this.noRDV);

      this.countdown(1991,1,1,1,1);
    }
    });
    });
    this.sub=this.PS.getallprofessionals().subscribe((res)=>{
      this.Puser=res;});
  }
  annuler(){
    var today=new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate();
    for (let i = 0; i < this.Cuser[0].mesRDV.length; i++) {
      if( this.Cuser[0].mesRDV[i].Date>=today)
      {
        swal({
        title: "Rendez-vous",
        text: "Vous avez deja un rendez-vous le "+this.Cuser[0].mesRDV[i].Date+" à "+this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.hour+":"+this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.minute,
        icon: "warning",
        buttons: ["Non", "Annuler RDV",],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
        
          swal("Rendez-vous annulé");
          this.distance=0;
          var time={hour:this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.hour,minute:this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.minute}
          //notification 
          this.notif={client:this.Cuser[0],
            currenttime:{hour:new Date().getHours(),minute:new Date().getMinutes(),second:0},
            seen:false,
            takentime:{hour:this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.hour,minute:this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.minute,second:0},
            message:"Rendez-vous annulé  ",
            dateRDV:this.Cuser[0].mesRDV[i].Date
          }
          this.NS.addNotif(this.notif);
          //end notification
          
          this.deleteRDV(this.Cuser[0].mesRDV[i].Date,time);
          this.Cuser[0].mesRDV.splice(i,1);
       
        
        //@ts-ignore
        this.CS.updateClient(this.Cuser[0],this.Cuser[0].id)
       //@ts-ignore
       this.PS.updateProfessional(this.Puser[0],this.Puser[0].id);
        
          clearInterval(this.x);
        } else {
          swal("Opération annulée");
        }
      });}
      
    }

  }
  deleteRDV(date,time){
    for (let i = 0; i < this.Puser[0].Rendez_vous.length; i++) {
      if(this.Puser[0].Rendez_vous[i].Date===date)
      {
        for (let j = 0; j < this.Puser[0].Rendez_vous[i].ClientsRDVs.length; j++) {
         
          if(this.Puser[0].Rendez_vous[i].ClientsRDVs[j].tempsRDV.hour==time.hour && this.Puser[0].Rendez_vous[i].ClientsRDVs[j].tempsRDV.minute==time.minute)
          {
           this.Puser[0].Rendez_vous[i].ClientsRDVs.splice(j,1);
           
          }
         
        }
      }
      
    }
  }
 
  ionViewWillLeave(){
    this.menu.close();
   }
   countdown(Year,Month,Day,Hour,Minute){
    
    
    var countDownDate = new Date(Year,Month,Day,Hour,Minute).getTime();
    //var countDownDate = new Date(date).getTime();
     this.x = setInterval(function() {
      var now = new Date().getTime();
      

       this.distance = countDownDate - now;

       if(this.distance>0)
     { this.noRDV=true;
       var days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
      document.getElementById("days").innerText = String(days);
      document.getElementById("hours").innerText = String(hours)
      document.getElementById("minutes").innerText =String(minutes);
      document.getElementById("seconds").innerText =String(seconds);
      ;}
      else{
        this.noRDV=false;
        document.getElementById("days").innerText = "0";
      document.getElementById("hours").innerText = "0"
      document.getElementById("minutes").innerText ="0";
      document.getElementById("seconds").innerText ="0";
      ;
      }
      
      if (this.distance < 0) {
        
        days=0
        hours=0
        minutes=0
        seconds=0
        clearInterval(this.x);
        //document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);
    console.log(this.noRDV);
   }
   ngOnDestroy() {
    clearInterval(this.x);
    if(this.sub!=undefined)
    {if(!this.sub.closed)
      {this.sub.unsubscribe();}
    }
    if(this.sub2!=undefined)
    {if(!this.sub2.closed)
      {this.sub2.unsubscribe();}
    }
   }
   reporter(){
    swal({
      title: "Reporter",
      text: "Voulez vous reporter votre rendez-vous ?",
      icon: "warning",
      buttons: ["Annuler", "Oui"],
     
    })
    .then((willDelete) => {
      if (willDelete) {
      this.nav.navigateForward("reporter");
      } else {
        swal("Operation annulé");
      }
    });
   }

}
