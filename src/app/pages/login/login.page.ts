import { professional } from './../../Services/professionnel.service';
import { ProfessionnelService,time } from 'src/app/Services/professionnel.service';
import { UserService } from './../../Services/user.service';
import { Client, ClientServiceService } from './../../Services/client-service.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import swal from 'sweetalert';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';
import { Subscription } from 'rxjs';
import { notification, NotificationService } from 'src/app/Services/notification.service';
  const { PushNotifications } = Plugins;
  import { Capacitor } from '@capacitor/core';
  const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
email:string="bilel@gmail.com ";
pass:string="Bilel1998";
isdesktop:boolean=false;
sub:Subscription;
showPassword=true;
sub2:Subscription;
sub3:Subscription;
Puser:professional[];
Cuser:Client[];
  constructor(private alert:AlertController,private toast:ToastController,private notiff:NotificationService
    ,private US:UserService, private NavCtrl: NavController,
    public Authe:AngularFireAuth,public CS:ClientServiceService,public storage:Storage,public platform: Platform,public PS:ProfessionnelService) {
  
   }

  ngOnInit() {
    this.sub3=this.PS.getallprofessionals().subscribe((res)=>{
      this.Puser=res;});
    this.storage.get('Email').then((val)=>{
    
      this.sub2= this.CS.ClientExist(val).subscribe((result)=>{
         this.Cuser=result;
        
       });
     });
   
     
    if (isPushNotificationsAvailable) {

      PushNotifications.requestPermissions().then( result => {
  
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      
    });
    
    PushNotifications.addListener('registration',
   (token: PushNotificationToken) => {
     
    this.storage.set('reftoken',token.value);  
    console.log(token.value) 
    
   }
 );
 
 // Some issue with our setup and push will not work
 PushNotifications.addListener('registrationError',
   (error) => {
    // alert(error);
     
   }
 );

 // Show us the notification payload if the app is open on our device
 PushNotifications.addListener('pushNotificationReceived',
   (notification: PushNotification) => {
   
   
    
    var data={title:notification.title,data:notification.data,body:notification.body,temps:JSON.parse(notification.data.Temps)};
    if(data.data.operation=='decalage')
    {var exchanged:time={hour:Number(data.temps.hour),minute:Number(data.temps.minute),second:0};
    swal({
      title: "Reporter",
      text: "Voulez Vous Changer Votre Rendez-Vous à "+exchanged.hour+":"+exchanged.minute,
      icon: "warning",
      buttons: ["Annuler", "Oui"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.notiff.ReporterRDV(exchanged,this.Cuser,this.Puser,data.data.Datee,this.Cuser[0].Email);
        this.notiff.addNotif2(data);
        swal("Votre Rendez-Vous est changé à "+exchanged.hour+":"+exchanged.minute, {
          icon: "success",
        });
  
      } else {
        swal("Operation Annulé");
      }
    });
     
        }
    else
    {  swal(notification.title,notification.data+' '+notification.body,'success');}
    
    }
 );

 // Method called when tapping on a notification
 PushNotifications.addListener('pushNotificationActionPerformed',
   (notification: PushNotificationActionPerformed) => { 
    var data={title:notification.notification.title,data:notification.notification.data,body:notification.notification.body,temps:JSON.parse(notification.notification.data.Temps)};
    if(data.data.operation=='decalage')
    {var exchanged:time={hour:Number(data.temps.hour),minute:Number(data.temps.minute),second:0};
    
      this.notiff.ReporterRDV(exchanged,this.Cuser,this.Puser,data.data.Datee,this.Cuser[0].Email);
      this.notiff.addNotif2(data);
        }
   });
  }
 this.storage.get('Profile').then((data)=>{
this.storage.get('Email').then((data2)=>{

console.log(data!=null);
console.log(data2);
  if(data)
  { this.email=data2.trim();
    this.getuser("","");
 
    if(data=="Client")
    {
      this.NavCtrl.navigateRoot('myrdv');}
    else if(data=="Professionnel")
    {
       this.NavCtrl.navigateRoot('profil-pro');}
  }

});
});
  }
  
 async login(){
   this.email=this.email.trim();
   const { email,pass } = this;
  
 try {
   const res = await this.Authe.auth.signInWithEmailAndPassword(email,pass);
  
   //notification registration 
  
   if(res.operationType == 'signIn')  
     { //@ts-ignore
       await this.getuser(res.user.uid,res.user.ya); }
  
 } catch (error) { 
   
   if(error.code=="auth/network-request-failed")
   {this.connection();}
   else
   {this.notloggedin();}
   console.dir(error);
   
 }
 

 }
 async notloggedin(){
  const toast= await this.toast.create({
   message: "Le Mot de Passe/Email est erronée,veuillez réessayer",
   duration: 4000
  });
  await toast.present(); 
}
getuser(id,token)
{
 
 
  if(this.platform.is('android'))
  {
    let Clist=this.CS.ClientExist((this.email).toLowerCase());
    this.sub=Clist.subscribe(res=>{
      this.storage.set('Level',res[0].Level);
      this.storage.set('Email',res[0].Email);
      this.storage.set('Genre',res[0].Genre);
      this.storage.set('NumT',res[0].NumT);
      this.storage.set('Nom',res[0].nom);
     
      this.storage.set('Profile',"Client");
      this.storage.set('Prenom',res[0].prenom);
      this.storage.get('reftoken').then((val)=>{
        res[0].token=val;
        //@ts-ignore
        this.CS.updateClient(res[0],res[0].id);
      })
      
      //@ts-ignore
      this.storage.set('id',res[0].id);
      this.NavCtrl.navigateRoot('myrdv');
     });
  }
  else
  {this.isdesktop=true;
    let Plist:any=this.PS.ProfessionalExist((this.email).toLowerCase());
    this.sub=Plist.subscribe(res=>{
      this.storage.set('Level',res[0].Level);
      this.storage.set('Email',res[0].Email);
      this.storage.set('Genre',res[0].Genre);
      this.storage.set('NumF',res[0].NumF);
      this.storage.set('NumT',res[0].NumT);
      this.storage.set('Nom',res[0].nom);
      this.storage.set('Profile',"Professionnel");
       //@ts-ignore
       this.storage.set('id',res[0].id);
      this.storage.set('Prenom',res[0].prenom);
      this.storage.set('Profession',res[0].Profession);
      res[0].token=token;
      this.PS.updateProfessional(res[0],res[0].id);
      this.NavCtrl.navigateRoot('profil-pro');
     });
    
  }

 
}
ngOnDestroy() {
  if(this.sub!=undefined)
  {if(this.sub.closed!=true)
  {this.sub.unsubscribe();}}
}
async connection(){
 const toast= await this.toast.create({
  message: "Pas de Connection Internet !",
  duration: 4000
 });
 await toast.present(); 
}
signup(){
  if(this.platform.is('android'))
  {
  this.NavCtrl.navigateForward('signup');  
  }
  else
  {
  this.NavCtrl.navigateForward('signup-pro');
  }
}
togglePasswordText(){
  this.showPassword=!this.showPassword;
  console.log(this.showPassword);
}
}
