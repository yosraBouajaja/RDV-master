import { notification, NotificationService } from './../../../Services/notification.service';
import { ClientServiceService,Client } from './../../../Services/client-service.service';
import { Storage } from '@ionic/storage';
import { professional,Services,time,RDVaujordui,RDV } from './../../../Services/professionnel.service';
import { ProfessionnelService } from 'src/app/Services/professionnel.service';
import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import swal from 'sweetalert';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
@Component({
  selector: 'app-prendre-rdv',
  templateUrl: './prendre-rdv.page.html',
  styleUrls: ['./prendre-rdv.page.scss'],
})

export class PrendreRDVPage implements OnInit {
  year:number=new Date().getFullYear();
  Puser:professional[];
  Cuser:Client[];
  activeServices:Services[]=new Array();
  listRDV:time[];
  chosentime:number;
  sub:Subscription;
  notif:notification
  sub2:Subscription
  month:number=Number(new Date().getMonth())+1;
  day:number=new Date().getDate();
  date:any=this.year+'-'+this.month+'-'+this.day;
  date2:any=this.year+'-'+12+'-'+30;
  chosenDate:any;
  constructor(private NS:NotificationService,private menu:MenuController,private PS:ProfessionnelService,private storage:Storage,private CS:ClientServiceService,private nav:NavController) {

   }

  ngOnInit() {
    if(this.month<10&&Number(this.day)<10){
      this.date=this.year+'-'+'0'+this.month+'-'+'0'+this.day
    }
   else if(Number(this.day)<10)
    {
      this.date=this.year+'-'+this.month+'-'+'0'+this.day
      
    }
   else if(this.month<10)
    {this.date=this.year+'-'+'0'+this.month+'-'+this.day}
this.chosenDate=this.date;
  this.sub=this.PS.getallprofessionals().subscribe((res)=>{
    this.Puser=res;

   
    //determining Services
    for (let i = 0; i < this.Puser[0].MesServices.length; i++) {
      if(this.Puser[0].MesServices[i].Active)
      {this.activeServices.push(this.Puser[0].MesServices[i]);}  

    }
    //determined Services
    // calculating time
  this.filteringarray();
  this.chosentime=-1;
  //end of calculating time
         //end of for 
  
  });
  this.storage.get('Email').then((val)=>{
    
   this.sub2= this.CS.ClientExist(val).subscribe((result)=>{
      this.Cuser=result;
    });
  });
  }
  ionViewWillLeave(){
    this.menu.close();
   }
   ngOnDestroy() {
     if(this.sub.closed!=true)
     { this.sub.unsubscribe();}
     if(this.sub2.closed!=true)
     { this.sub2.unsubscribe();}
   }
  
   saveRDV(){
    
    var chosenServices:Services[]=new Array();
    for (let i = 0; i < this.activeServices.length; i++) {
      if((document.getElementById(''+i)as HTMLInputElement).checked)
      {//this.Puser[0].Rendez_vous[this.Puser[0].Rendez_vous.length]
        chosenServices.push(this.activeServices[i]);
      }     
    }
    if(this.chosentime==-1)
    {swal("Temps","Il faut  choisir l'heure du rendez-vous","error");return;}
    if(chosenServices.length==0)
    {swal("Service","Il faut choisir au moins un service","error");return;}
    
    var delet=true;
   var RDV:RDVaujordui={tempsRDV:this.listRDV[this.chosentime],
      index:{Nom:this.Cuser[0].nom,
        Prenom:this.Cuser[0].prenom,
        NumT:this.Cuser[0].NumT+"",
        Token:this.Cuser[0].token,
        DateN:this.Cuser[0].DateN,
        Genre:this.Cuser[0].Genre,
        Email:this.Cuser[0].Email},
      Service:chosenServices,
      hasAccount:true}
      var rdv:RDV={Date:'',ClientsRDVs:new Array()};
      var ch:string=this.chosenDate;
      this.chosenDate=ch.slice(0,10);
      rdv.Date=this.chosenDate;
     
      
      rdv.ClientsRDVs.push(RDV);
      var exist=false;var pinpoint:number;var exist2=false;var pinpoint2:number;
      for (let i = 0; i <  this.Puser[0].Rendez_vous.length; i++) {
        if( this.Puser[0].Rendez_vous[i].Date===this.chosenDate)
        {exist=true;pinpoint=i;}
      }
        if(this.Cuser[0].mesRDV==undefined)
        {this.Cuser[0].mesRDV=new Array();}
      for (let i = 0; i < this.Cuser[0].mesRDV.length; i++) {
        if(this.Cuser[0].mesRDV[i].Date===this.chosenDate)
        {exist2=true;pinpoint2=i;}       
      }
      var today=new Date().getFullYear()+"-"+(Number(new Date().getMonth())+1)+"-"+new Date().getDate();
      for (let i = 0; i < this.Cuser[0].mesRDV.length; i++) {
       
        if(new Date(this.Cuser[0].mesRDV[i].Date)>new Date(today)){
          delet=false;
          
          swal({
          title: "Rendez-vous",
          text: "Vous avez déja un rendez-vous le "+this.Cuser[0].mesRDV[i].Date+" à "+this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.hour+":"+this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.minute,
          icon: "warning",
          buttons: ["Voir RDV ", "Annuler RDV",],
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Rendez-vous annulé");
            
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
         this.nav.navigateRoot("cmes-rdv");
            
      
          } else {
           this.nav.navigateRoot("myrdv");
          }
        });}
        else if(this.Cuser[0].mesRDV[i].Date===today)
        {if(this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.hour>=new Date().getHours())
          {delet=false;
          swal({
          title: "Rendez-vous",
          text: "Vous avez déja un rendez-vous le "+this.Cuser[0].mesRDV[i].Date+" à "+this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.hour+":"+this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.minute,
          icon: "warning",
          buttons: ["Voir RDV ", "Reporter RDV",],
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Rendez-vous annulé");
            
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
         
          //  this.deleteRDV(this.Cuser[0].mesRDV[i].Date,time);
            this.Cuser[0].mesRDV.splice(i,1);
        
          //@ts-ignore
        this.CS.updateClient(this.Cuser[0],this.Cuser[0].id)
         //@ts-ignore
          this.PS.updateProfessional(this.Puser[0],this.Puser[0].id);
         this.nav.navigateRoot("cmes-rdv");
            
      
          } else {
            this.nav.navigateRoot("myrdv");
          }
        });}}

        
      }
      if(delet){
      if(exist2)
      {
        this.Cuser[0].mesRDV[pinpoint2].ClientsRDVs.push(RDV)
      }
      else
      {this.Cuser[0].mesRDV.push(rdv);}
     if(exist)
      {this.Puser[0].Rendez_vous[pinpoint].ClientsRDVs.push(RDV)}
      else
      {this.Puser[0].Rendez_vous.push(rdv);}

      this.notif={client:this.Cuser[0],
        currenttime:{hour:new Date().getHours(),minute:new Date().getMinutes(),second:0},
        seen:false,
        takentime:{hour:rdv.ClientsRDVs[0].tempsRDV.hour,minute:rdv.ClientsRDVs[0].tempsRDV.minute,second:0},
        message:"à reservé un rendez-vous",
        dateRDV:rdv.Date
      }
      this.NS.addNotif(this.notif);
      //@ts-ignore
      this.CS.updateClient(this.Cuser[0],this.Cuser[0].id)
      //@ts-ignore
     this.PS.updateProfessional(this.Puser[0],this.Puser[0].id);
     this.nav.navigateRoot("myrdv");
    }
   }
   makelistoftime(begin:time,duree:time,rest:time){
    let listoftimes=new Array();
    listoftimes.push(begin);
    let nbbegin= this.calculateminutes(begin.hour,begin.minute);
    let nbduree= this.calculateminutes(duree.hour,duree.minute);
    let nbrest= this.calculateminutes(rest.hour,rest.minute);
    let som:number=nbbegin;
   var i=0;
    while(this.calculatetime(som).hour<23)
    {  som=nbduree+nbrest+som;
      i++;
     
      listoftimes.push(this.calculatetime(som));
   }
    return listoftimes;
  }
  calculatetime(minutes){
    let calculated:time={hour:Math.floor(minutes/60),minute:minutes%60,second:0};
   return calculated;
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
  //return minutes
  calculateminutes(hour:number,minute:number)
  {
    return (hour*60)+minute;
  }
  filteringarray(){

    if(this.month<10&&Number(this.day)<10){
      var today=this.year+'-'+'0'+this.month+'-'+'0'+this.day
    }
   else if(Number(this.day)<10)
    {
      var today=this.year+'-'+this.month+'-'+'0'+this.day
      
    }
   else if(this.month<10)
    { var today=this.year+'-'+'0'+this.month+'-'+this.day}
    let exist=false;
    var ch:string=this.chosenDate;
      this.chosenDate=ch.slice(0,10);
    for (let i = 0; i < this.Puser[0].Rendez_vous.length; i++) {
      var date=this.chosenDate;
      if(this.Puser[0].Rendez_vous[i].Date==date)
       {exist=true;}
    }
    console.log(this.chosenDate)
    console.log(today);
    if(exist){
      
     let d =this.makelistoftime(this.Puser[0].param.StartMorning,
       this.Puser[0].param.Duree,
       this.Puser[0].param.WaitTime);
       let pinpointdate=null;
       let pinpointRDV=null;
       d=this.generatetimes(d);
       for (let i = 0; i < this.Puser[0].Rendez_vous.length; i++) {
         if( this.Puser[0].Rendez_vous[i].Date==date)
          {
               pinpointdate=i;
               break;
          }
       }
       for (let i = 0; i < this.Puser[0].Rendez_vous[pinpointdate].ClientsRDVs.length; i++) {
         for (let j = 0; j < d.length; j++) {
          if(this.Puser[0].Rendez_vous[pinpointdate].ClientsRDVs[i].tempsRDV.hour==d[j].hour && this.Puser[0].Rendez_vous[pinpointdate].ClientsRDVs[i].tempsRDV.minute==d[j].minute )
           {
             d.splice(j,1);
           } 
         } 
       }
       //filtrage of today
       if(today==this.chosenDate)
    {   var ok=true;
    while(ok)
      { var i=0;
        ok=false;
        console.log("entered")
       d.forEach(element => {
        console.log(element["hour"]," < ",new Date().getHours()," = ",element.hour<new Date().getHours())
        if(element.hour<new Date().getHours())
        {d.splice(i,1);ok=true;}
        else if(element.hour==new Date().getHours())
        {if(element.minute<new Date().getMinutes())
       
         {d.splice(i,1);console.log("2")}
        i++;
    
      }
    });
  }
}
       console.log(d);
     /* if(today==this.chosenDate)
      { for (let x = 0; x < d.length; x++) {
        console.log(d[3])
         if(d[x].hour<new Date().getHours())
         {d.splice(x,1);}
         else if(d[x].hour==new Date().getHours())
         {if(d[x].minute<new Date().getMinutes())
        
          {d.splice(x,1);console.log("2")}
        
        }
         
       }
     console.log(d);
      }*/
       this.listRDV=d;
   }
   else{
     //console.log("else");
    let d =this.makelistoftime(this.Puser[0].param.StartMorning,
      this.Puser[0].param.Duree,
      this.Puser[0].param.WaitTime);
      d=this.generatetimes(d);
      if(today==this.chosenDate)
      {   var ok=true;
      while(ok)
        { var i=0;
          ok=false;
          console.log("entered")
         d.forEach(element => {
          console.log(element["hour"]," < ",new Date().getHours()," = ",element.hour<new Date().getHours())
          if(element.hour<new Date().getHours())
          {d.splice(i,1);ok=true;}
          else if(element.hour==new Date().getHours())
          {if(element.minute<new Date().getMinutes())
         
           {d.splice(i,1);console.log("2")}
          i++;
      
        }
      });
    }
  }
      this.listRDV=d;
      
    }
    
   

     
   }
   
   generatetimes(timearray:time[]){
    let filteredtimearray:time[]=new Array();
    var isstartM=false;
    var isendM=false;
    var isstartE=false;
    var isendE=false;
    for (let i = 0; i < timearray.length; i++) {
      if(timearray[i].hour==this.Puser[0].param.StartMorning.hour &&   timearray[i].minute==this.Puser[0].param.StartMorning.minute)
       {isstartM=true;}
       if(timearray[i].hour==this.Puser[0].param.EndMorning.hour &&  timearray[i].minute==this.Puser[0].param.EndMorning.minute)
       {isstartM=false;isendM=true;}
       if(timearray[i].hour==this.Puser[0].param.StartEvening.hour &&  timearray[i].minute==this.Puser[0].param.StartEvening.minute)
       {isstartE=true;}
       if(timearray[i].hour==this.Puser[0].param.EndEvening.hour && timearray[i].minute==this.Puser[0].param.EndEvening.minute)
       {isstartE=false;isendE=true;}

       if(isstartM){
       filteredtimearray.push(timearray[i]);
      
       }
       else if(isendM)
       {
        filteredtimearray.push(timearray[i]);
       
        isendM=false;
       }
       else if(isstartE)
       {
         filteredtimearray.push(timearray[i])
        

      }
      else if(isendE)
      {
      filteredtimearray.push(timearray[i]);
      isendE=false;
      }
    }
    console.log(filteredtimearray);
    return filteredtimearray;
   }
  
}
