import { Subscription } from 'rxjs';
import { ClientServiceService,Client } from './../../Services/client-service.service';
import { ProfessionnelService, professional } from './../../Services/professionnel.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { NotificationService } from 'src/app/Services/notification.service';
@Component({
  selector: 'app-testpage2',
  templateUrl: './testpage2.page.html',
  styleUrls: ['./testpage2.page.scss'],
})
export class Testpage2Page implements OnInit {
 hide=false;
 Email:string;
 TDate:any= new Date().getFullYear()+'-'+(Number(new Date().getMonth())+1)+'-'+new Date().getDate();
 Puser:professional[];
  Cuser:Client[];
  sub:Subscription;
  sub2:Subscription;
  constructor(private PS:ProfessionnelService,private CS:ClientServiceService,private storage:Storage,private report:NotificationService) { }

  ngOnInit() {
    this.sub=this.PS.getallprofessionals().subscribe((res)=>{
      this.Puser=res;});
    this.storage.get('Email').then((val)=>{
    this.Email=val;
      this.sub2= this.CS.ClientExist(val).subscribe((result)=>{
         this.Cuser=result;
         console.log(this.Cuser);
       });
     });
    console.log(this.TDate)
    console.log(this.Cuser);
  }
 ReporterRDV(){
   var time={hour:10,minute:30,second:0}
this.report.ReporterRDV(time,this.Cuser,this.Puser,this.TDate,this.Email);
 }
 
  
}
