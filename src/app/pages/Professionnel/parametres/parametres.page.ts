import { Storage } from '@ionic/storage';
import { ProfessionnelService } from 'src/app/Services/professionnel.service';
import { time, professional } from './../../../Services/professionnel.service';
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.page.html',
  styleUrls: ['./parametres.page.scss'],
})
export class ParametresPage implements OnInit {
//variables to calculate with
StartM:time={hour:7,minute:30,second:0};
StartE:any;
EndM:any;
EndE:any;
Duree:NgbTimeStruct={hour:0,minute:45,second:0};
wait:NgbTimeStruct={hour:0,minute:10,second:0};
//variables to show with
listoftimeM:time[]=new Array();
listoftimeES:time[]=new Array();
listoftimeEE:time[]=new Array();
//service variables
Puser:professional[];
sub:Subscription;
  constructor(private menu:MenuController,private PS:ProfessionnelService,private storage:Storage) { }

  ngOnInit() {
    if(this.menu.isEnabled('Client'))
   {this.menu.enable(false,'Client');}
   
   this.storage.get('Email').then((val)=>{
    this.sub=this.PS.ProfessionalExist(val).subscribe(res=>{
     this.Puser=res;
     if(this.Puser[0].param==null)
     {
       this.Puser[0].param={
         StartEvening:this.StartE,
         StartMorning:this.StartM,
         EndEvening:this.EndE,
         EndMorning:this.EndM,
         Duree:this.Duree,
         Description:'',
         Active:true,
         img:'',
         WaitTime:this.wait
       }
       
    }
    this.makelistoftimesMorning(this.Puser[0].param.StartMorning,this.Puser[0].param.Duree,this.Puser[0].param.WaitTime)
    });
  });
  
  }
  ngOnDestroy() {
    if(this.sub.closed!=true)
    {this.sub.unsubscribe();}
  }
  //calculate time
  calculatetime(minutes){
    let calculated:time={hour:Math.round(minutes/60),minute:minutes%60,second:0};
   return calculated;
  }
  //return minutes
  calculateminutes(hour:number,minute:number)
  {
    return (hour*60)+minute;
  }
  makelistoftimesMorning(begin:time,duree:time,rest:time){
    let listoftimes=new Array();
    let nbbegin= this.calculateminutes(begin.hour,begin.minute);
    let nbduree= this.calculateminutes(duree.hour,duree.minute);
    let nbrest= this.calculateminutes(rest.hour,rest.minute);
    let som:number=nbbegin;
    while(this.calculatetime(som).hour<23)
    {  som=nbduree+nbrest+som;
      listoftimes.push(this.calculatetime(som));
   }
    
    this.listoftimeM=listoftimes;
    if(this.EndM!=undefined)
  {this.makelistoftimesNight(this.listoftimeM[this.EndM],this.Puser[0].param.Duree,this.Puser[0].param.WaitTime);}
  }
  makelistoftimesNight(begin:time,duree:time,rest:time){
    let listoftimes=new Array();
    let nbbegin= this.calculateminutes(begin.hour,begin.minute);
    let nbduree= this.calculateminutes(duree.hour,duree.minute);
    let nbrest= this.calculateminutes(rest.hour,rest.minute);
    let som:number=nbbegin;
    while(this.calculatetime(som).hour<23)
    {  som=nbduree+nbrest+som;
      listoftimes.push(this.calculatetime(som));

   }
  
   this.listoftimeES=listoftimes;
   if(this.StartE!=undefined){
     this.makelistoftimesNightEnd(this.listoftimeM[this.StartE],this.Puser[0].param.Duree,this.Puser[0].param.WaitTime)
   }
  }
  makelistoftimesNightEnd(begin:time,duree:time,rest:time){
    let listoftimes=new Array();
    let nbbegin= this.calculateminutes(begin.hour,begin.minute);
    let nbduree= this.calculateminutes(duree.hour,duree.minute);
    let nbrest= this.calculateminutes(rest.hour,rest.minute);
    let som:number=nbbegin;
    while(this.calculatetime(som).hour<23)
    {  som=nbduree+nbrest+som;
      listoftimes.push(this.calculatetime(som));
      
   }
   this.listoftimeEE=listoftimes;
  }
 savesettings(){
 if(this.EndM==undefined)
 {swal("Les Horaires", "Vous Devez Choisir les Horaires du Matin", "error");return;}
 else if(this.StartE==undefined)
 {swal("Les Horaires", "Vous Devez Choisir les Horaires du Soir", "error");return;}
 else if(this.EndE==undefined)
 {swal("Les Horaires", "Vous Devez Choisir les Horaires du Soir", "error");return;}
 
  this.Puser[0].param.EndMorning=this.listoftimeM[this.EndM];
  this.Puser[0].param.StartEvening=this.listoftimeES[this.StartE]
  this.Puser[0].param.EndEvening=this.listoftimeEE[this.EndE];
  //@ts-ignore
 this.PS.updateProfessional(this.Puser[0],this.Puser[0].id);
 swal("Les Parametres", "Sont Enregistrés avec Succée", "success")
}
  ionViewWillLeave(){
    this.menu.close();
  }
  ionViewDidEnter(){
    
    this.menu.enable(true,'Professionnel');
  }

}
