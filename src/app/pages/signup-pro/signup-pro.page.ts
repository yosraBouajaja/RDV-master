import { NavController, ToastController } from '@ionic/angular';
import { ProfessionnelService, professional } from './../../Services/professionnel.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-signup-pro',
  templateUrl: './signup-pro.page.html',
  styleUrls: ['./signup-pro.page.scss'],
})

export class SignupProPage implements OnInit {
nom:string;prenom:string;NumT:number;NumF:number;Profession:string='null';email:string;pass:string;
Verifpass:string;DateN:string;genre:string;
prof:professional={
  nom:'',
  img:'',
  mesClient:new Array(),
  prenom:'',
  NumF:null,
  NumT:null,
  Profession:'',
  Email:'',
  DateN:null,
  Genre:'',
  Level:1,
  token:'',
  Rendez_vous:new Array(),
  param:null,
  MesServices:new Array()

};
  constructor(public Auth:AngularFireAuth,private PS:ProfessionnelService,private nav:NavController,public toast:ToastController) { }

  ngOnInit() {
  }

  Inscrire(){
    const { email,pass,Verifpass } = this;
    this.PS.ProfessionalExist(email).subscribe((val)=>{
  
    console.log(val);
    
    if(val.length!=0)
    {
      return console.error('Cette adresse mail existe Deja');
    }
     if(pass != Verifpass || !this.hasLowercase()||!this.hasnumber||!this.hasUppercase||!this.longerthan8)
     {
       
       return console.error('Wrong pass');
     }
    
    this.Auth.auth.createUserWithEmailAndPassword(email,pass);
    this.prof.DateN=this.DateN; this.prof.NumF=this.NumF; this.prof.nom=this.nom;
    this.prof.Email=(this.email).toLowerCase(); this.prof.NumT=this.NumT; this.prof.prenom=this.prenom;
    this.prof.Genre=this.genre; this.prof.Profession=this.Profession;
    this.PS.addProfessional(this.prof);
    this.nav.navigateBack('login');
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
   
    if(this.pass!=undefined)
    {if(checkpass.test(this.pass))
      {return true;}
    }
  }
  hasUppercase(){
    var checkpass=new RegExp(/[A-Z]/g);
    
     if(this.pass!=undefined)
     {if(checkpass.test(this.pass))
       {return true;}
     }
   }
   hasLowercase(){
    var checkpass=new RegExp(/[a-z]/g);;
   
    
     if(this.pass!=undefined)
     {if(checkpass.test(this.pass))
       {return true;}
     }
   }
   longerthan8(){
    var checkpass=new RegExp(/[a-z]/g);
    
     if(this.pass.length>8)
     {if(checkpass.test(this.pass))
       {return true;}
     }
   }
}
