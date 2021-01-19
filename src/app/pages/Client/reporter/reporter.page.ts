import { FcmService } from './../../../Services/fcm.service';
import { notification, NotificationService } from './../../../Services/notification.service';
import { ClientServiceService,Client } from './../../../Services/client-service.service';
import { Storage } from '@ionic/storage';
import { professional,Services,time,RDVaujordui,RDV } from './../../../Services/professionnel.service';
import { ProfessionnelService } from 'src/app/Services/professionnel.service';
import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import swal from 'sweetalert';


@Component({
  selector: 'app-reporter',
  templateUrl: './reporter.page.html',
  styleUrls: ['./reporter.page.scss'],
})
export class ReporterPage implements OnInit {
  year:number=new Date().getFullYear();
  Puser:professional[];
  Cuser:Client[];
  activeServices:Services[]=new Array();
  listRDV:any;
  test2:any;
  chosentime:number;
  sub:Subscription;
  notif:notification
  sub2:Subscription;
  sub3:Subscription;
  FCMtokens:any;
  month:number=Number(new Date().getMonth())+1;
  day:number=new Date().getDate();
  date:any=this.year+'-'+this.month+'-'+this.day;
  date2:any=this.year+'-'+12+'-'+this.day;
  chosenDate:any;
  constructor(private fcm:FcmService,private NS:NotificationService,private menu:MenuController,private PS:ProfessionnelService,private storage:Storage,private CS:ClientServiceService,private nav:NavController) {

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

  this.sub=this.PS.getallprofessionals().subscribe((res)=>{
    this.Puser=res;
    console.log( this.Puser[0].Rendez_vous[1].ClientsRDVs)
    
    //determining Services
    for (let i = 0; i < this.Puser[0].MesServices.length; i++) {
      if(this.Puser[0].MesServices[i].Active)
      {this.activeServices.push(this.Puser[0].MesServices[i]);}  

    }
    //determined Services
    // calculating time
  
  this.chosentime=-1;
  //end of calculating time
         //end of for 
  

  this.storage.get('Email').then((val)=>{
    
   this.sub2= this.CS.ClientExist(val).subscribe((result)=>{
      this.Cuser=result;

 if(Number(new Date(this.Cuser[0].mesRDV[ this.Cuser[0].mesRDV.length-1].Date).getMonth()+1)<10&&Number(new Date(this.Cuser[0].mesRDV[ this.Cuser[0].mesRDV.length-1].Date).getDate())<10){
  this.test2=this.year+'-'+'0'+(Number(new Date(this.Cuser[0].mesRDV[ this.Cuser[0].mesRDV.length-1].Date).getMonth()+1))+'-'+'0'+Number(new Date(this.Cuser[0].mesRDV[ this.Cuser[0].mesRDV.length-1].Date).getDate())
}
else if(Number(new Date(this.Cuser[0].mesRDV[ this.Cuser[0].mesRDV.length-1].Date).getDate())<10)
{
  this.test2=this.year+'-'+(Number(new Date(this.Cuser[0].mesRDV[ this.Cuser[0].mesRDV.length-1].Date).getMonth()+1))+'-'+'0'+Number(new Date(this.Cuser[0].mesRDV[ this.Cuser[0].mesRDV.length-1].Date).getDate())
  
}

else if(Number(new Date(this.Cuser[0].mesRDV[ this.Cuser[0].mesRDV.length-1].Date).getMonth()+1)<10)
{this.test2=this.year+'-'+'0'+(Number(new Date(this.Cuser[0].mesRDV[ this.Cuser[0].mesRDV.length-1].Date).getMonth()+1))+'-'+Number(new Date(this.Cuser[0].mesRDV[ this.Cuser[0].mesRDV.length-1].Date).getDate())}
this.chosenDate=this.test2;
console.log(this.test2);
if(this.listRDV!=undefined){
for (let index = 0; index < this.listRDV.length; index++) {
 if(this.Cuser[0].mesRDV[ this.Cuser[0].mesRDV.length-1].ClientsRDVs[0].tempsRDV.hour==this.listRDV[index].hour

 )
 {}
  
}
{}
}

this.filteringarray();
    });
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
    {swal("Heure","Il faut  choisir l'heure du rendez-vous","error");return;}
    if(chosenServices.length==0)
    {swal("Service","Il faut choisir au moins  un service","error");return;}
    console.log(this.Puser[0].Rendez_vous[1].ClientsRDVs)
    var delet=true;
   var RDV:RDVaujordui={tempsRDV:this.listRDV[this.chosentime],
      index:{Nom:this.Cuser[0].nom,
        Token:this.Cuser[0].token,
        Prenom:this.Cuser[0].prenom,
        NumT:this.Cuser[0].NumT+"",
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
        if( this.Puser[0].Rendez_vous[i].Date==this.chosenDate)
        {exist=true;pinpoint=i;}
      }
     
        if(this.Cuser[0].mesRDV==undefined)
        {this.Cuser[0].mesRDV=new Array();}
       
      for (let i = 0; i < this.Cuser[0].mesRDV.length; i++) {
        if(this.Cuser[0].mesRDV[i].Date==this.chosenDate)
        {exist2=true;pinpoint2=i;}       
      }
    
      var today=new Date().getFullYear()+"-"+(Number(new Date().getMonth())+1)+"-"+new Date().getDate();
      for (let i = 0; i < this.Cuser[0].mesRDV.length; i++) {
       
        if(new Date(this.Cuser[0].mesRDV[i].Date)>new Date(today) )
        {delet=false;
         
          swal({
          title: "Rendez-vous",
          text: "Votre rendez-vous est le "+this.Cuser[0].mesRDV[i].Date+" à "+this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.hour+":"+this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.minute,
          icon: "warning",
          buttons: ["Non ", "Reporter RDV",],
     
        })
        .then((willDelete) => {
          
          if (willDelete) {
          
            console.log("2",this.Puser[0].Rendez_vous[1].ClientsRDVs)
            swal("Rendez-vous reporté");
            
            var time={hour:this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.hour,minute:this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.minute}
            //notification 
            this.notif={client:this.Cuser[0],
              currenttime:{hour:new Date().getHours(),minute:new Date().getMinutes(),second:0},
              seen:false,
              takentime:{hour:RDV.tempsRDV.hour,minute:RDV.tempsRDV.minute,second:0},
              message:"Rendez-vous reporté du "+this.Cuser[0].mesRDV[i].Date+" à "+this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.hour+":"+this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.minute,
              dateRDV:rdv.Date
            }
          //  this.NS.addNotif(this.notif);
            //end notification
            
            console.log("before",this.Puser[0].Rendez_vous[1].ClientsRDVs);
            this.deleteRDV(this.Cuser[0].mesRDV[i].Date,time,RDV,this.chosenDate);
           
            var useddata={operation:'decalage',Temps:time,date:this.Cuser[0].mesRDV[i].Date}
            var data={"FcmToken":this.FCMtokens,
            "title":"Reporter",
            "body":"Voulez vous réporter votre rendez-vous à "+time.hour+':'+time.minute,
            useddata};
           // console.log(data)
          this.sub3= this.fcm.Send(data);
           console.log("after",this.Puser[0].Rendez_vous[1].ClientsRDVs);
           console.log( "this.CUSER",this.Cuser[0].mesRDV[i]);
            this.Cuser[0].mesRDV[i]=rdv;
          console.log( "this.CUSER",this.Cuser[0].mesRDV[i]);
          //@ts-ignore
          this.CS.updateClient(this.Cuser[0],this.Cuser[0].id)
         //@ts-ignore
         this.PS.updateProfessional(this.Puser[0],this.Puser[0].id);
       this.nav.navigateRoot("myrdv");
            
      
          } else {
             this.nav.navigateRoot("myrdv");
          }
        });}
        else if(this.Cuser[0].mesRDV[i].Date==today)
        {delet=false;
         
          swal({
          title: "Rendez-vous",
          text: "Votre rendez-vous est le "+this.Cuser[0].mesRDV[i].Date+" à "+this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.hour+":"+this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.minute,
          icon: "warning",
          buttons: ["Non ", "Réporter RDV",],
     
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Rendez-vous reporté");
            
            var time={hour:this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.hour,minute:this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.minute}
            //notification
           
           
            this.notif={client:this.Cuser[0],
              currenttime:{hour:new Date().getHours(),minute:new Date().getMinutes(),second:0},
              seen:false,
              takentime:{hour:RDV.tempsRDV.hour,minute:RDV.tempsRDV.minute,second:0},
              message:"Rendez-vous reporté du "+this.Cuser[0].mesRDV[i].Date+" à "+this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.hour+":"+this.Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.minute,
              dateRDV:rdv.Date
            }
            this.NS.addNotif(this.notif);
            //end notification
            
            console.log("before",this.Puser[0].Rendez_vous[1].ClientsRDVs);
            this.deleteRDV(this.Cuser[0].mesRDV[i].Date,time,RDV,this.chosenDate);
            console.log( "5",this.Puser[0].Rendez_vous[1].ClientsRDVs[0].index.Email);
            console.log( "5",this.Puser[0].Rendez_vous[1].ClientsRDVs[1].index.Email);
            console.log( "5",this.Puser[0].Rendez_vous[1].ClientsRDVs[2].index.Email);
            console.log("------------------------------------------------------------")
            var useddata={operation:'decalage',Temps:time,date:this.Cuser[0].mesRDV[i].Date}
            var data={"FcmToken":this.FCMtokens,
            "title":"Reporter",
            "body":"Voulez vous réporter votre rendez-vous a "+time.hour+':'+time.minute,
            useddata};
            console.log("after",this.Puser[0].Rendez_vous[1].ClientsRDVs);
            console.log(data);
           this.fcm.Send(data);
            console.log( "this.CUSER",this.Cuser[0].mesRDV[i]);
            this.Cuser[0].mesRDV[i]=rdv;
            console.log( "this.CUSER",this.Cuser[0].mesRDV[i]);
          //@ts-ignore
          this.CS.updateClient(this.Cuser[0],this.Cuser[0].id)
         //@ts-ignore
       this.PS.updateProfessional(this.Puser[0],this.Puser[0].id);
        this.nav.navigateRoot("myrdv");
            
      
          } else {
             this.nav.navigateRoot("myrdv");
          }
        });}
        
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
     // this.NS.addNotif(this.notif);
      //@ts-ignore
      //this.CS.updateClient(this.Cuser[0],this.Cuser[0].id)
      //@ts-ignore
     //this.PS.updateProfessional(this.Puser[0],this.Puser[0].id);
    // this.nav.navigateRoot("myrdv");
    }
   }
   makelistoftime(begin:time,duree:time,rest:time){
    let listoftimes=new Array();
    listoftimes.push(begin);
    let nbbegin= this.calculateminutes(begin.hour,begin.minute);
    let nbduree= this.calculateminutes(duree.hour,duree.minute);
    let nbrest= this.calculateminutes(rest.hour,rest.minute);
    let som:number=nbbegin;
    while(this.calculatetime(som).hour<23)
    {  som=nbduree+nbrest+som;
      listoftimes.push(this.calculatetime(som));
   }
    return listoftimes;
  }
  calculatetime(minutes){
    let calculated:time={hour:Math.floor(minutes/60),minute:minutes%60,second:0};
   return calculated;
  }
  deleteRDV(date,time,RDV,newdate){
    this.FCMtokens=new Array();
   console.log("delegte rdv",this.Puser[0].Rendez_vous[1].ClientsRDVs)
    for (let i = 0; i < this.Puser[0].Rendez_vous.length; i++) {
      if(this.Puser[0].Rendez_vous[i].Date==date)
      { 
        for (let j = 0; j < this.Puser[0].Rendez_vous[i].ClientsRDVs.length; j++) {
          
          if(this.Puser[0].Rendez_vous[i].ClientsRDVs[j].tempsRDV.hour==time.hour && this.Puser[0].Rendez_vous[i].ClientsRDVs[j].tempsRDV.minute==time.minute)
          {var user=this.Puser[0].Rendez_vous[i].ClientsRDVs[j].index.Email;
           
            this.Puser[0].Rendez_vous[i].ClientsRDVs=this.bubbleSort(this.Puser[0].Rendez_vous[i].ClientsRDVs);
            console.log( "1",this.Puser[0].Rendez_vous[1].ClientsRDVs[0].index.Email);
            console.log( "1",this.Puser[0].Rendez_vous[1].ClientsRDVs[1].index.Email);
            console.log( "1",this.Puser[0].Rendez_vous[1].ClientsRDVs[2].index.Email);
            console.log("------------------------------------------------------------")
           for (let z = 0; z < this.Puser[0].Rendez_vous[i].ClientsRDVs.length; z++) {
            if(this.Puser[0].Rendez_vous[i].ClientsRDVs[z].index.Email==user)
             {var pinpoint = z;}
             console.log( "2",this.Puser[0].Rendez_vous[1].ClientsRDVs[0].index.Email);
             console.log( "2",this.Puser[0].Rendez_vous[1].ClientsRDVs[1].index.Email);
             console.log( "2",this.Puser[0].Rendez_vous[1].ClientsRDVs[2].index.Email);
             console.log("------------------------------------------------------------")
             console.log("index = ",pinpoint);
           }

            if(this.Puser[0].Rendez_vous[i].ClientsRDVs[pinpoint+1]!=undefined)
            {console.log(this.Puser[0].Rendez_vous[i].ClientsRDVs[pinpoint+1].index.Token)
              this.FCMtokens.push(this.Puser[0].Rendez_vous[i].ClientsRDVs[pinpoint+1].index.Token);
            }
            if(this.Puser[0].Rendez_vous[i].ClientsRDVs[pinpoint+2]!=undefined)
            {
              this.FCMtokens.push(this.Puser[0].Rendez_vous[i].ClientsRDVs[pinpoint+2].index.Token);
            }
            if(this.Puser[0].Rendez_vous[i].ClientsRDVs[pinpoint+3]!=undefined)
            {
              this.FCMtokens.push(this.Puser[0].Rendez_vous[i].ClientsRDVs[pinpoint+3].index.Token);
            }
           
            var ok =true;
            while(ok){
              var ii=0;
              ok=false;
              this.Puser[0].Rendez_vous[i].ClientsRDVs.forEach(element => {
                if(element.index.Email==RDV.index.Email)
                {this.Puser[0].Rendez_vous[i].ClientsRDVs.splice(ii,1);ok=true;}
                  ii++;
              });
            }
           
          
          }
          
        }
      }
      
    }
    var exist=false;
    for (let i = 0; i < this.Puser[0].Rendez_vous.length; i++) {
      if(this.Puser[0].Rendez_vous[i].Date==newdate)
      {
        
          
         
          exist=true;
           this.Puser[0].Rendez_vous[i].ClientsRDVs.push(RDV);
          
        
      }
      
    }
    
    if(!exist){
      var newrdv:RDV={Date:newdate,ClientsRDVs:new Array()}
      newrdv.ClientsRDVs.push(RDV);
      this.Puser[0].Rendez_vous.push(newrdv);
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
      var date2=new Date(this.Puser[0].Rendez_vous[i].Date).getFullYear()+'-'+(Number(new Date(this.Puser[0].Rendez_vous[i].Date).getMonth())+1)+'-'+new Date(this.Puser[0].Rendez_vous[i].Date).getDate();
      if(this.Puser[0].Rendez_vous[i].Date==date)
       {exist=true;
      }
    }
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
       console.log("today  = ",today," chosen date = ",this.chosenDate,"  ==",today==this.chosenDate);
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
   else{
    let d =this.makelistoftime(this.Puser[0].param.StartMorning,
      this.Puser[0].param.Duree,
      this.Puser[0].param.WaitTime);
      d=this.generatetimes(d);
      console.log("today  = ",today," chosen date = ",this.chosenDate,"  ==",today==this.chosenDate);   
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
     console.log("here");
   
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
    return filteredtimearray;
   }
  
   bubbleSort(RDV:RDVaujordui[]){
    if(RDV!=undefined){
     var len = RDV.length;
     for (var i = len-1; i>=0; i--){
       for(var j = 1; j<=i; j++){
         if( this.calculateminutes(RDV[j-1].tempsRDV.hour,RDV[j-1].tempsRDV.hour)
           >this.calculateminutes(RDV[j].tempsRDV.hour,RDV[j].tempsRDV.minute)
           ){
             var temp = RDV[j-1];
             RDV[j-1] = RDV[j];
             RDV[j] = temp;
          }
       }
     }
     return RDV;
   }
  }
  annuler(){
    this.nav.navigateRoot("myrdv");
  }
}
