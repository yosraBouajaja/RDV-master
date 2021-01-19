import { Subscription } from 'rxjs';
import { notification } from './../../Services/notification.service';
import { NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { ClientServiceService,Client } from './../../Services/client-service.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Services/notification.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
notif:notification;
sub:Subscription;
  constructor(public toastController: ToastController,private NS:NotificationService,public Auth:AngularFireAuth,private CS:ClientServiceService,private nav:NavController,public toast:ToastController) { }
  nom:string;prenom:string;NumT:number;NumF:number;Profession:string='null';email:string;pass:string;
  Verifpass:string;DateN:string='2000-01-01';genre:string;
  prof:Client={
    nom:'',
    img:'avatar7.png',
    prenom:'',
    NumT:null,
    Email:'',
    DateN:null,
    Genre:'',
    Level:2,
    token:'',
    mesRDV:new Array()
  };
  ngOnInit() {
  }
  ngOnDestroy() {
    if(this.sub!=undefined)
    {if(this.sub.closed!=true)
    {this.sub.unsubscribe();}}
  }
  Inscrire(){
    const { email,pass,Verifpass } = this;
    if(this.nom==undefined)
    {
      this.message("Le champ 'Nom' est vide");
      return console.error('Cette adresse mail existe Deja');
    }
    else if(this.prenom==undefined)
    {
      this.message("Le champ 'Prenom' est vide");
      return console.error('Cette adresse mail existe Deja');
    }
    else if(this.NumT==undefined)
    {
      this.message("Le champ 'Numéro du téléphone' est vide");
      return console.error('Cette adresse mail existe Deja');
    }else if(this.NumT.toString().length!=8)
    {
      this.message("Numéro du téléphone doit etre égale à 8 chiffres");
      return console.error('Cette adresse mail existe Deja');
    }
    else if(this.genre==undefined)
    {
      this.message("Veuillez Choisir l'un des sexe");
      return console.error('Cette adresse mail existe Deja');
    }
   else if(this.email==undefined)
   {
     this.message("Le champ 'Email' est vide");
     return console.error('Cette adresse mail existe Deja');
   }
   else if(!this.emailverif())
   {this.message("Cette adresse email est invalide");
     return console.error('Cette adresse mail existe Deja');

   }
   else if(this.pass==undefined)
   {
     this.message("Le champ 'Mot de pass' est vide");
     return console.error('Cette adresse mail existe Deja');
   }

  this.sub=  this.CS.ClientExist(email).subscribe((val)=>{
  
  
    
    if(val.length!=0)
    {
      swal({
        title: "Error",
        text: "Adresse email existe déja",
        icon: "warning",
        buttons: ["Annuler", "Oui"],
        dangerMode: true,
      })
      return console.error('Cette adresse mail existe Deja');
    }console.log(this.hasLowercase());
     if(pass != Verifpass || !this.hasLowercase()||!this.hasnumber||!this.hasUppercase||!this.longerthan8)
     {
      swal({
        title: "Error",
        text: "Mot de Passe Erroné",
        icon: "warning",
        buttons: ["Annuler", "Oui"],
        dangerMode: true,
      })
       return console.error('Wrong pass');
     }
    
    this.Auth.auth.createUserWithEmailAndPassword(email,pass);
    this.prof.DateN=this.DateN;  
    this.prof.nom=this.nom;
    this.prof.Email=(this.email).toLowerCase(); 
    this.prof.NumT=this.NumT;
     this.prof.prenom=this.prenom;
    this.prof.Genre=this.genre; 
    //notification part
    this.notif={client:this.prof,
      currenttime:{hour:new Date().getHours(),minute:new Date().getMinutes(),second:0},
      seen:false,
      takentime:{hour:new Date().getHours(),minute:new Date().getMinutes(),second:0},
      message:"A Rejoint le Plateforme",
      dateRDV:new Date().getFullYear()+"-"+(Number(new Date().getMonth())+1)+"-"+new Date().getDate()
    }
    this.NS.addNotif(this.notif);
    //end notification part
   this.CS.addClient(this.prof);
    this.nav.navigateRoot('login');
  });
  }
  async allpurpose(error) {
    const toast = await this.toast.create({
      message: error,
      duration: 2000
    });
    toast.present();
  }
  hasnumber(){
    var checkpass=new RegExp(/[1-9]/g);
    var ok=false;
     if(this.pass!=undefined)
     {if(checkpass.test(this.pass))
       {ok=true;}
     }
     return ok;
   }
    emailverif(){
      var checkpass=new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
   var   ok=false;
       if(this.email!=undefined)
       {if(checkpass.test(this.email))
         {ok= true;}
       }
       return ok;
     }
   hasUppercase(){
     var checkpass=new RegExp(/[A-Z]/g);
     var ok=false;
      if(this.pass!=undefined)
      {if(checkpass.test(this.pass))
        {ok= true;}
      }
      return ok;
    }
    hasLowercase(){
     var checkpass=new RegExp(/[a-z]/g);;
    var ok=false;
     
      if(this.pass!=undefined)
      {if(checkpass.test(this.pass))
        {ok= true;}
      }
      return ok;
    }
    longerthan8(){
     var checkpass=new RegExp(/[a-z]/g);
     var ok=false;
      if(this.pass.length>7)
      {if(checkpass.test(this.pass))
        {ok= true;}
      }
      return ok;
    }
    async message(data) {
      const toast = await this.toastController.create({
        message: data,
        duration: 2000
      });
      toast.present();
    }
    navLogin(){
      this.nav.navigateRoot("login");
    }
  
}
