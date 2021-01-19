import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { UploadService } from './../../../Services/upload.service';
import { professional,ProfessionnelService } from './../../../Services/professionnel.service';
import { Storage } from '@ionic/storage';
import { Client } from './../../../Services/client-service.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, ToastController, NavController } from '@ionic/angular';
import { ClientServiceService } from 'src/app/Services/client-service.service';
@Component({
  selector: 'app-cprofile',
  templateUrl: './cprofile.page.html',
  styleUrls: ['./cprofile.page.scss'],
})
export class CProfilePage implements OnInit {
Cuser:Client[]=new Array();
Puser:professional[];
today:string;
modify:boolean=false;
save:boolean=true;
userProfileImg:any='https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/bg_33.png';
nom:string='';
prenom:string='';
Email:string='';
index:number=-1;
NumT:string='';
Genre:string='';
sub2:Subscription;
sub:Subscription;
  constructor(private nav:NavController,private toast:ToastController,private Auth:AngularFireAuth,private alert:AlertController,private up:UploadService,private menu:MenuController,private CS:ClientServiceService,private storage:Storage,private PS:ProfessionnelService) { 
    this.storage.get('id').then((val)=>{
      
  this.sub=    this.CS.GetClient(val).subscribe(res=>{
       this.Cuser[0]=res;
       
       this.userProfileImg= this.up.getProfileImageUrl(this.Cuser[0].img)
       .getDownloadURL().then(url => {
         this.userProfileImg = url
       });
      });
    });
    this.sub2=   this.PS.getallprofessionals().subscribe(res=>{
    this.Puser=res;
    });
  }

  ngOnInit() {
  }
 ionViewWillLeave(){
    this.menu.close();
   }
   ngOnDestroy() {
    if(this.sub!=undefined)
    {if(!this.sub.closed)
      {this.sub.unsubscribe();}
    }
    if(this.sub2!=undefined)
    {if(!this.sub2.closed)
      {this.sub2.unsubscribe();}
    }
   }
   modification(){
    this.modify=true;
    this.save=false;
    this.nom=this.Cuser[0].nom;
    this.prenom=this.Cuser[0].prenom
    this.Email=this.Cuser[0].Email
    this.NumT=String(this.Cuser[0].NumT)
    this.Genre=this.Cuser[0].Genre
  }
  saving(){
    if(this.nom.length==0)
    { this.allpurpose("Le champ 'Nom' est vide");return;}
    else if(this.prenom.length==0)
    { this.allpurpose("Le champ 'Prenom' est vide");return;}
    else if(this.NumT==null)
    { this.allpurpose("Le champ 'Numéro téléphone' est vide");return;}
    else if(String(this.NumT).length!=8)
    {this.allpurpose("Numéro téléphone doit etre composé de 8 chiffres");console.log(String(this.NumT).length);return;}
   
    this.modify=false;
    this.save=true;
    this.Cuser[0].nom =this.nom
    this.Cuser[0].prenom =this.prenom
    this.Cuser[0].Email =this.Email;
    this.Cuser[0].NumT=Number(this.NumT)
    this.Cuser[0].Genre =this.Genre
    //@ts-ignore
    this.CS.updateClient(this.Cuser[0],this.Cuser[0].id);
   
  }
  changepic(event: FileList){
    this.up.uploadImage2(event,this.Cuser);
    const file = event.item(0);
   var fileName = file.name;
   this.Puser[0].param.img=fileName;
    //@ts-ignore
    this.CS.updateClient(this.Cuser[0],this.Cuser[0].id);
    this.userProfileImg= this.up.getProfileImageUrl(this.Cuser[0].img)
           .getDownloadURL().then(url => {
             this.userProfileImg = url
           });
    }
    async changeit() {
      const alert = await this.alert.create({
        cssClass: 'my-custom-class',
        header: 'Changer Adresse Mail',
        inputs: [
          {
            name: 'name1',
            type: 'text',
            placeholder: 'Mot de Passe'
          },
          {
            name: 'name2',
            type: 'text',
            placeholder: 'Nouveau Adresse Email'
          },
          
    
        ],
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
             
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              
              this.ChangeEmail(this.Cuser[0].Email,data.name1,data.name2)
            }
          }
        ]
      });
      await alert.present();
  }
  ChangeEmail(user,pass,newuser)
  {console.log(user);
    if(newuser=='')
    {
      this.allpurpose("Le champ email est vide");return;
    }
    else if(pass=='')
    {
      this.allpurpose("Le champ mot de passe est vide");return;
    }
    
    try{
      const res =this.Auth.auth.signInWithEmailAndPassword(user,pass).then((val)=>{
        val.user.updateEmail(newuser);
       
    this.Cuser[0].Email=newuser.toLowerCase(); 
      //@ts-ignore
      this.CS.updateClient(this.Cuser[0],this.Cuser[0].id);
      this.storage.set('Email',this.Cuser[0].Email);
    this.allpurpose("l'Adresse Email a été changé avec succée");
    this.nav.navigateRoot('cprofile');
  }).catch((val)=>{
    this.allpurpose("Adresse mail est invalide ou mot de passe erroné");
  })
    }
    catch(error){
       
       this.allpurpose('Mot de Passe Erronée');
    }

  }
  async allpurpose(val) {
    const toast = await this.toast.create({
      message: val,
      duration: 2000
    });
    toast.present();
  }
}
