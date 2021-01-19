import { ClientServiceService,Client } from './Services/client-service.service';


import { UserService } from './Services/user.service';
import { Component } from '@angular/core';
import swal from 'sweetalert';
import { Platform, NavController, MenuController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  month:number=Number(new Date().getMonth())+1;
  day:number=new Date().getDate();
  year:number=new Date().getFullYear();
  date:any=this.year+'-'+this.month+'-'+this.day;
  hasRDV=false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nav:NavController,private US:ClientServiceService,private storage:Storage,
    private menu:MenuController,
    private alertcontroller:AlertController
  ) {
    this.initializeApp();
  }
C:Client;
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  this.storage.get("Email").then(val=>{
console.log(val)
this.storage.get("Level").then(val3=>{
     if(val==null)
     {console.log("is null")}
     else if(val3=='1')
     {console.log("is not client")}
     else
     {this.US.ClientExist(val).subscribe((res)=>{
      this.C=res[0];
      if(res[0].mesRDV!=undefined){
        if(res[0].mesRDV.length==0){
          this.hasRDV=false;
        }
     else  if(new Date(res[0].mesRDV[res[0].mesRDV.length-1].Date)>new Date(this.date))
      {this.hasRDV=true;}
      else if(res[0].mesRDV[res[0].mesRDV.length-1].Date==this.date)
      {this.hasRDV=true;}
       else
       {this.hasRDV=false;}
      }else{
        this.hasRDV=false;
      }
      console.log(this.hasRDV);
     });
    }
  });
});
  }
  closem(){
    this.menu.close();
  }
  
  async logout() {
    const alert = await this.alertcontroller.create({
      cssClass: 'my-custom-class',
      header: 'Déconnexion',
      animated:true,
      mode:"ios",
      message: 'Voulez vous se Déconnecter ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'primary',
          handler: (blah) => {
            this.closem();
          }
        }, {
          text: 'Ok',
          cssClass: 'primary',
          handler: () => {
            this.nav.navigateRoot("logout");
          }
        }
      ]
    });

    await alert.present();
  }
}
