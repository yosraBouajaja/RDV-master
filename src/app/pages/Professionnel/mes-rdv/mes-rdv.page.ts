import { notif } from './../../../Services/fcm.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { UploadService } from './../../../Services/upload.service';
import { notification } from './../../../Services/notification.service';
import swal from 'sweetalert';
import { Storage } from '@ionic/storage';
import { ProfessionnelService, professional, Client, Services, RDV, RDVaujordui,time } from './../../../Services/professionnel.service';
import { MenuController, AlertController } from '@ionic/angular';
import { Component, ElementRef, OnInit,Renderer2, ViewChild, ViewEncapsulation, } from '@angular/core';
import {NgbDateStruct, NgbCalendar,NgbModal,ModalDismissReasons,NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { Subscription } from 'rxjs';
import { exit } from 'process';
@Component({
  selector: 'app-mes-rdv',
  templateUrl: './mes-rdv.page.html',
  styleUrls: ['./mes-rdv.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MesRDVPage implements OnInit {
Notif:notification[]
hide:boolean=true;
notifstring:any=new Array();

  //client index
indexC:number;
//RDV index
indexRDV:number=-1;
indexofday:number;
index:number=999;
  //Client info
Nom:string;
Prenom:string;
Email:String;
NumT:string;
DateN:any;
clickeddate:number=new Date().getDate();
//list of RDVs
listRDV:time[]=new Array();
currentTime:time={hour:new Date().getHours(),minute:new Date().getMinutes(),second:0};
//client info end
months:any;

days:any;
Puser:any;
counter:number=1;
Month:any=new Date();
day:any=new Date();
Year:any=new Date();
dateofmonth:any;
monthsday:any=[];
sub:Subscription;
time:any;
dateRDV:any={year:new Date().getFullYear(),month:Number(new Date().getMonth())+1,day:new Date().getDate()};
week:any=[];
calendar:any=[];
changeMonth:number;
table:any;
details:any;
ch:string='';
sub2:Subscription;
  constructor(private NS:NotificationService,private upload:UploadService,private menu:MenuController,private element:ElementRef,
    private renderer: Renderer2,private calendrier: NgbCalendar,
    private modalService: NgbModal,private PS:ProfessionnelService,private storage:Storage,private alert:AlertController) { }
  model: NgbDateStruct;
  ngOnInit() {
    this.sub2=this.NS.getNotif().subscribe((val)=>{
      this.Notif=val.reverse();
      
     this.showimg(this.Notif);
      });
    if(this.menu.isEnabled('Client'))
   {this.menu.enable(false,'Client');}
   this.days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    this.months = ["Janvier", "Février","Mars", "Avril", "May", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
    this.Month=this.months[this.Month.getMonth()];
    this.time = {hour: 0, minute: 0};
    this.day=this.days[this.day.getDay()]
    this.Year=this.Year.getFullYear();
//determine type of month 31 or 30
var d:any=new Date();
this.dateofmonth= d.getDate();
this.changeMonth=d.getMonth();
      
     
      d=new Date(d.getFullYear(), Number(this.changeMonth + 1), 0);

    this.storage.get('Email').then((val)=>{
      this.sub=this.PS.ProfessionalExist(val).subscribe(res=>{
       this.Puser=res;
       if(this.Puser[0].Rendez_vous==undefined)
       {this.Puser[0].Rendez_vous=new Array();}
       this.pinpoint(new Date().getFullYear(),Number(new Date().getMonth())+1,new Date().getDate())
       this.bubbleSort();
      });
     
    });
   this.loadcalendar();
   setInterval(()=>{
     this.currentTime={hour:new Date().getHours(),minute:new Date().getMinutes(),second:0}
     
   }, 6000);

  }
  loadcalendar(){
    this.ch='';
    var getDaysInMonth = function(month,year) {
     return new Date(year, month, 0).getDate();
    };
    
    this.calendar=[];
    this.monthsday=[];
    var d:any=new Date();
    var days = new Date(d.getFullYear(), 2, 0).getDate();
    for (var i = 1; i <= days; i++) {
      this.monthsday.push(i);
    }
    
    var start = new Date(d.getFullYear(), Number(this.changeMonth)).getDay();
    
    var day = 1;
    for (var i = 1; i <= 6; i++) {
      this.ch=this.ch+'<section class="calendar__week">';
      for (var j = 0; j < 7; j++) {
        if(this.dateofmonth==this.counter)
        {this.ch=this.ch+'<div class="calendar__day today" >';}
        else
        {this.ch=this.ch+'<div class="calendar__day" >';}
        if (day > this.monthsday) {
          this.week.push(null)
          this.ch=this.ch+'<span class="calendar__date">&nbsp;</span>';
        } else {
          if (i === 1 && j < start) {
            this.week.push(getDaysInMonth(Number(this.changeMonth), this.Year)-start+j+1)

            this.ch=this.ch+'<span class="calendar__date">'+(getDaysInMonth((Number(this.changeMonth)), this.Year)-start+j+1)+'</span>';
          }
          else if (day > getDaysInMonth(Number(this.changeMonth)+1, this.Year)){
          day=1;
          this.week.push(day)
          this.ch=this.ch+'<span class="calendar__date today">' + day + '</span>';
          day++;
          }
           else {
            this.week.push(day)
            this.ch=this.ch+'<span class="calendar__date" ">' + day + '</span>';
            this.ch=this.ch+' <a class="calendar__task" (click)="checktasks()">3</a>';
            day++;
            
            
          }
        }
        this.ch=this.ch+'</div>';
      }
      this.calendar.push(this.week);
      this.week=[];
      this.ch=this.ch+'</section>';

    }
   
  }
  ngOnDestroy() {
    if(this.sub.closed==false)
    {this.sub.unsubscribe();}
  }
  ionViewWillLeave(){
    this.menu.close();

  }
  pinpoint(year,month,day){
    var date=year+'-'+month+'-'+day;
    var date2;
    if(Number(month)<10&&Number(day)<10){
      date2=year+'-'+'0'+month+'-'+'0'+day
    }
   else if(Number(this.day)<10)
    {
      date2=year+'-'+month+'-'+'0'+day
      
    }
   else if(Number(month)<10)
    {date2=year+'-'+'0'+month+'-'+day}
   console.log(date2)
   for (let i = 0; i < this.Puser[0].Rendez_vous.length; i++) {
     if(date==this.Puser[0].Rendez_vous[i].Date)
     {this.indexofday=i;console.log(this.indexofday);break;}
     else if(date2==this.Puser[0].Rendez_vous[i].Date)
     {this.indexofday=i;console.log(this.indexofday);break;}
     else
     {this.indexofday=-1;console.log(this.indexofday);}
     
   }
  }
  show(){
    if(this.hide)
    {this.hide=false;}
    else
   {this.hide=true;}
   this.showimg(this.Notif);
   
  }
  showimg(Clientimage:notification[]){

  for (let i = 0; i < Clientimage.length; i++) {
    var img=Clientimage[i].client.img
    this.upload.getProfileImageUrl(img).getDownloadURL().then(url => {
      this.notifstring.push(url);
    });
  }
  this.notifstring.reverse();
  
  }
 bubbleSort(){
   if(this.Puser[0].Rendez_vous[this.indexofday]!=undefined){
    var len = this.Puser[0].Rendez_vous[this.indexofday].ClientsRDVs.length;
    for (var i = len-1; i>=0; i--){
      for(var j = 1; j<=i; j++){
        if( this.calculateminutes(this.Puser[0].Rendez_vous[this.indexofday].ClientsRDVs[j-1].tempsRDV.hour,this.Puser[0].Rendez_vous[this.indexofday].ClientsRDVs[j-1].tempsRDV.hour)
          >this.calculateminutes(this.Puser[0].Rendez_vous[this.indexofday].ClientsRDVs[j].tempsRDV.hour,this.Puser[0].Rendez_vous[this.indexofday].ClientsRDVs[j].tempsRDV.minute)
          ){
            var temp = this.Puser[0].Rendez_vous[this.indexofday].ClientsRDVs[j-1];
            this.Puser[0].Rendez_vous[this.indexofday].ClientsRDVs[j-1] = this.Puser[0].Rendez_vous[this.indexofday].ClientsRDVs[j];
            this.Puser[0].Rendez_vous[this.indexofday].ClientsRDVs[j] = temp;
         }
      }
    }
  }
 }
  checktasks(id){
    this.day=this.days[new Date(this.Year+'-'+(Number(this.changeMonth)+1)+'-'+id).getDay()];
   
   this.Month=this.months[this.changeMonth];
   
    this.clickeddate=id;
    this.oldays()
    this.pinpoint(new Date().getFullYear(),Number(this.changeMonth)+1,id);
    this.bubbleSort();
  }

  ajouterRDV(){
    if(this.Puser[0].Rendez_vous==undefined)
    {this.Puser[0].Rendez_vous=new Array();}
    var activeServices:Services[]=new Array();
    var chosenServices:Services[]=new Array();
     //determining active services
     for (let i = 0; i < this.Puser[0].MesServices.length; i++) {
       if(this.Puser[0].MesServices[i].Active)
       {activeServices.push(this.Puser[0].MesServices[i]);}  
     }
          //end of for 
   
    for (let i = 0; i < activeServices.length; i++) {
      if((document.getElementById(''+i)as HTMLInputElement).checked)
      {//this.Puser[0].Rendez_vous[this.Puser[0].Rendez_vous.length]
        chosenServices.push(activeServices[i]);
      }     
    }
   

    var date=this.dateRDV.year+'-'+this.dateRDV.month+'-'+this.dateRDV.day;
   
    let d:any=new Date(this.Year,this.dateRDV.month-1,this.dateRDV.day,this.time.hour,this.time.minute);
    this.indexC=Number((document.getElementById('ClientSelect')as HTMLInputElement).value)
    
    if(this.index==999)
    {swal("Client", "Il faut Choisir un Client", "warning");return;}
    else if(chosenServices.length==0 )
    {swal("Service", "Il faut au Moins Choisir un Service", "warning");return;}
    let rightnowRDV:RDVaujordui={tempsRDV:{hour:this.listRDV[this.indexRDV].hour,minute:this.listRDV[this.indexRDV].minute,second:0},index:this.Puser[0].mesClient[this.indexC],Service:chosenServices,hasAccount:false}

    var rdv:RDV={Date:'',ClientsRDVs:new Array()};
    rdv.Date=date;
    rdv.ClientsRDVs.push(rightnowRDV);
    var exist=false;
    var pinpoint=0;
    for (let i = 0; i <  this.Puser[0].Rendez_vous.length; i++) {
      if( this.Puser[0].Rendez_vous[i].Date===date)
      {exist=true;pinpoint=i;}
    }
     

    if(exist)
    {this.Puser[0].Rendez_vous[pinpoint].ClientsRDVs.push(rightnowRDV)
    }
    else
    {this.Puser[0].Rendez_vous.push(rdv);
    }
  this.PS.updateProfessional(this.Puser[0],this.Puser[0].id);
  this.bubbleSort();
  this.modalService.dismissAll();
  }
  openModal(content,Client) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  
    }, (reason) => {

      if(reason=='Ajouter')
      {this.ajouterClient(Client);}

    });
    
  }
  
  //Ajouter un nouveau client
  ajouterClient(Client){
  this.modalService.open(Client, {ariaLabelledBy: 'ClientAj'});
  }
  AddClient(){
    var ch:string=this.DateN.year+'-'+this.DateN.month+'-'+this.DateN.day;
    var NewC:Client={Nom:this.Nom,Prenom:this.Prenom,Genre:(document.getElementById('Genre')as HTMLInputElement).value,Email:this.Email+'',NumT:this.NumT,DateN:ch,Token:''};
  if(this.Puser[0].mesClient==undefined)
  {
    this.Puser[0].mesClient=new Array();
  }  
  this.Puser[0].mesClient.push(NewC);
  this.PS.updateProfessional(this.Puser[0],this.Puser[0].id);
  }
  //time functions
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
  //return minutes
  calculateminutes(hour:number,minute:number)
  {
    return (hour*60)+minute;
  }
  oldays(){
    this.clickeddate
    this.changeMonth
        if(this.changeMonth==new Date().getMonth())
    {if(this.clickeddate>=new Date().getDate())
      {return true;}
      else
      {return false;} 
    }
    else if(this.changeMonth>=new Date().getMonth())
    {return true}
    else
    {return false}

  }
  filteringarray(){
  
    let exist=false;
    for (let i = 0; i < this.Puser[0].Rendez_vous.length; i++) {
      var date=this.dateRDV.year+'-'+this.dateRDV.month+'-'+this.dateRDV.day;
      if(this.Puser[0].Rendez_vous[i].Date===date)
       {exist=true;}
    }
    if(exist){
     let d =this.makelistoftime(this.Puser[0].param.StartMorning,
       this.Puser[0].param.Duree,
       this.Puser[0].param.WaitTime);
       let pinpointdate=null;
       let pinpointRDV=null;
       d=this.generatetimes(d);
       for (let i = 0; i < this.Puser[0].Rendez_vous.length; i++) {
         if( this.Puser[0].Rendez_vous[i].Date===date)
          {
               pinpointdate=i;
               exit;
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
       this.listRDV=d;
   }
   else{
    let d =this.makelistoftime(this.Puser[0].param.StartMorning,
      this.Puser[0].param.Duree,
      this.Puser[0].param.WaitTime);
      d=this.generatetimes(d);
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
 //confirmation de presence
 confirmerPresence(i){
   console.log(this.Puser[0].Rendez_vous[this.indexofday].ClientsRDVs,
    " ",i);
   var time={heure:'23',minute:'30'}
   var useddata={operation:'decalage',Temps:time,date:'2021-01-05'}
    if(this.Puser[0].Rendez_vous[this.indexofday].ClientsRDVs[i+1]!=undefined){
      var data:any={FcmToken:[this.Puser[0].Rendez_vous[this.indexofday].ClientsRDVs[i+1].index.Token],
        title:'Rendez-Vous',
        body:'Le Client qui vous precéde est arrivé a son Rendez-Vous',
        data:'',useddata};
        console.log("here")
        this.PS.ConfirmerPresence(data);
    }
    if(this.Puser[0].Rendez_vous[this.indexofday].ClientsRDVs[i+2]!=undefined){
      var data1:any={FcmToken:[this.Puser[0].Rendez_vous[this.indexofday].ClientsRDVs[i+2].index.Token],
        title:'Rendez-Vous',
        body:'Il vous Precéde un Seule Client',
      data:'',useddata};
        this.PS.ConfirmerPresence(data1);
    }
     if(this.Puser[0].Rendez_vous[this.indexofday].ClientsRDVs[i+3]!=undefined){
      var data2:any={FcmToken:[this.Puser[0].Rendez_vous[this.indexofday].ClientsRDVs[i+3].index.Token],
        title:'Rendez-Vous',
        body:'Il vous Precéde Deux Clients',
        data:'',useddata};
        this.PS.ConfirmerPresence(data2);
    }


 }
}
