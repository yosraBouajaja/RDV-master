import  swal  from 'sweetalert';
import { notification } from './../../../Services/notification.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { UploadService } from './../../../Services/upload.service';
import { AlertController, MenuController, NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ProfessionnelService,professional } from 'src/app/Services/professionnel.service';
import { Subscription } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-profil-pro',
  templateUrl: './profil-pro.page.html',
  styleUrls: ['./profil-pro.page.scss'],
})
export class ProfilProPage implements OnInit {
Puser:professional[]=new Array();
sub:Subscription;
today:string;
modify:boolean=false;
save:boolean=true;
userProfileImg:any;
nom:string='';
prenom:string='';
Email:string='';
index:number=-1;
NumF:string='';
NumT:string='';
Genre:string='';
hide=true;
Notif:notification[];
notifstring:string[]=new Array();
sub2:Subscription;
  constructor(private NS:NotificationService,private up:UploadService,private alert:AlertController, private toast:ToastController,private menu:MenuController,private PS:ProfessionnelService,private storage:Storage,private nav:NavController,public Auth:AngularFireAuth) { }

  ngOnInit() {
    this.sub2=this.NS.getNotif().subscribe((val)=>{
      this.Notif=val.reverse();
      
      this.showimg(this.Notif);
      });
    if(this.menu.isEnabled('Client'))
   {this.menu.enable(false,'Client');}
   
   this.storage.get('id').then((val)=>{
     console.log(val);
    
     console.log('here');
      this.sub=this.PS.GetProfessionalbyID(val).subscribe(res2=>{
        this.Puser[0]=res2;
       // var ch=new Date().getFullYear()+"-"+(Number(new Date().getMonth())+1)+'-'+new Date().getDate();
        if((Number(new Date().getMonth())+1)<10&&new Date().getDate()<10)
        { var ch:string=new Date().getFullYear()+'-0'+(Number(new Date().getMonth())+1)+'-0'+new Date().getDate();}
        else if((Number(new Date().getMonth())+1)<10)
        {var ch:string=new Date().getFullYear()+'-0'+(Number(new Date().getMonth())+1)+'-'+new Date().getDate();}
        else if(new Date().getDate()<10)
        {var ch:string=new Date().getFullYear()+'-'+(Number(new Date().getMonth())+1)+'-0'+new Date().getDate();}
        else
        {var ch:string=new Date().getFullYear()+'-'+(Number(new Date().getMonth())+1)+'-'+new Date().getDate();}
        console.log(ch);
        this.today=ch;
        this.index=this.Puser[0].Rendez_vous.findIndex(element => element.Date==ch);
        this.userProfileImg= this.up.getProfileImageUrl(this.Puser[0].param.img)
        .getDownloadURL().then(url => {
          this.userProfileImg = url
        });
      })
      
     });

  
  }
  ngOnDestroy() {
    if(this.sub.closed!=true)
    {this.sub.unsubscribe();}
  }
  ionViewWillLeave(){
    this.menu.close();
  }
  ionViewDidEnter(){
    
    this.menu.enable(true,'Professionnel');
  }
  modification(){
    this.modify=true;
    this.save=false;
    this.nom=this.Puser[0].nom;
    this.prenom=this.Puser[0].prenom
    this.Email=this.Puser[0].Email
    this.NumF=String(this.Puser[0].NumF)
    this.NumT=String(this.Puser[0].NumT)
    this.Genre=this.Puser[0].Genre
  }
  saving(){
    if(this.nom.length==0)
    {swal('Error','Le champ nom est vide','error');return;}
    else if(this.prenom.length==0)
    {swal('Error','Le champ prénom  est vide','error');return;}
    else if(this.NumF.length==0)
    {swal('Error','Le champ numéro fixe est vide','error');return;}
    else if(this.NumT.length==0)
    {swal('Error','Le champ Numéro de téléphone est vide','error');return;}
   else if(String(this.NumF).length!=8)
   {swal('Error','Le champ numéro fixe doit etre compris de 8 chiffres','error');return;}
   else if(String(this.NumT).length!=8)
   {swal('Error','Le champ Numéro de téléphone doit etre compris de 8 chiffres','error');return;}
    this.modify=false;
    this.save=true;
    this.Puser[0].nom =this.nom
    this.Puser[0].prenom =this.prenom
    this.Puser[0].Email =this.Email
    this.Puser[0].NumF=Number(this.NumF)
    this.Puser[0].NumT=Number(this.NumT)
    this.Puser[0].Genre =this.Genre
    //@ts-ignore
    this.PS.updateProfessional(this.Puser[0],this.Puser[0].id);
  }
  ChangeEmail(user,pass,newuser)
  { if(newuser=='')
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
        this.Puser[0].Email=newuser.toLowerCase();
      //@ts-ignore
      this.PS.updateProfessional(this.Puser[0],this.Puser[0].id);
      this.storage.set('Email',this.Puser[0].Email);
    this.allpurpose("l'Adresse Email a été changé avec succée");
      }).catch((val)=>{
        this.allpurpose("Adresse mail est invalide ou mot de passe erroné");
      });
    }
    catch(error){
       console.dir(error);
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
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok',data.name1);
            this.ChangeEmail(this.Puser[0].Email,data.name1,data.name2)
          }
        }
      ]
    });
    await alert.present();
}
changepic(event: FileList){
 this.up.uploadImage(event,this.Puser);
 const file = event.item(0);
var fileName = file.name;
this.Puser[0].param.img=fileName;
 //@ts-ignore
 this.PS.updateProfessional(this.Puser[0],this.Puser[0].id);
 this.userProfileImg= this.up.getProfileImageUrl(this.Puser[0].param.img)
        .getDownloadURL().then(url => {
          this.userProfileImg = url
        });
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
  this.up.getProfileImageUrl(img).getDownloadURL().then(url => {
    this.notifstring.push(url);
  });
}
this.notifstring.reverse();

}
}
