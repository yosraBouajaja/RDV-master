import { AngularFireAuth } from '@angular/fire/auth';
import { UploadService } from './../../../Services/upload.service';
import { professional,ProfessionnelService } from './../../../Services/professionnel.service';
import { Storage } from '@ionic/storage';
import { Client } from './../../../Services/client-service.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, ToastController } from '@ionic/angular';
import { ClientServiceService } from 'src/app/Services/client-service.service';
@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.page.html',
  styleUrls: ['./horaire.page.scss'],
})
export class HorairePage implements OnInit {
  Cuser:Client[]=new Array();
  Puser:professional[];
  constructor(private toast:ToastController,private Auth:AngularFireAuth,private alert:AlertController,private up:UploadService,private menu:MenuController,private CS:ClientServiceService,private storage:Storage,private PS:ProfessionnelService) { 
    this.PS.getallprofessionals().subscribe(res=>{
      this.Puser=res;
      });
  }

  ngOnInit() {
  }
  ionViewWillLeave(){
    this.menu.close();
   }

}