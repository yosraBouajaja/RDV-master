import { UploadService } from './../../../Services/upload.service';
import { NotificationService,notification } from './../../../Services/notification.service';
import { professional,Services } from './../../../Services/professionnel.service';
import { ProfessionnelService } from 'src/app/Services/professionnel.service';
import { MenuController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import swal from 'sweetalert';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mes-services',
  templateUrl: './mes-services.page.html',
  styleUrls: ['./mes-services.page.scss'],
})
export class MesServicesPage implements OnInit {
hide=true;
Notif:notification[];
  constructor(private upload:UploadService,private NS:NotificationService,private alertC:AlertController,private menu:MenuController,private PS:ProfessionnelService,private storage:Storage) { }
  Puser:any[];
  notifstring:string[]=new Array();
  sub:Subscription;
  sub2:Subscription;
  ngOnInit() {
    if(this.menu.isEnabled('Client'))
   {this.menu.enable(false,'Client');}
   this.storage.get('Email').then((val)=>{
    this.sub=this.PS.ProfessionalExist(val).subscribe(res=>{
    this.Puser=res;
    console.log(this.Puser[0].MesServices)
    });
   });
//notifications
   this.sub2=this.NS.getNotif().subscribe((val)=>{
   this.Notif=val.reverse();
   
   this.showimg(this.Notif);
   });

  }
  ionViewWillLeave(){
    this.menu.close();
  }
  ionViewDidEnter(){
    
    this.menu.enable(true,'Professionnel');
  }
  
ngOnDestroy() {
if(this.sub.closed!=true)
{this.sub.unsubscribe();}
if(this.sub2.closed!=true)
{this.sub2.unsubscribe();}
}
// alert box
async presentAlertPrompt(data1,data2) {
  const alert = await this.alertC.create({
    cssClass: 'my-custom-class',
    header: 'Ajouter un Service',
    inputs: [
      { label:'test',
        name: 'Service',
        type: 'text',
        value:data1,
        id:'Service',
        placeholder: 'Nom du Service'
      },
      {
        name: 'Cout',
        type: 'number',
        id: 'Cout',
        value:data2,
        placeholder: 'Cout'
      }     
    ],
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ajouter',
        handler: data=> {
          if(data.Cout==""&&data.Service.length==0)
          {swal(" Service & cout", "Le champ du 'cout service' et 'nom service' sont vide");this.presentAlertPrompt("",""); return;}
          else if(data.Service.length==0)
          {swal("Service", "Le champ du'nom service' est vide");this.presentAlertPrompt("",data.Cout);return;}
          else if(data.Cout=="")
          {swal("Cout", "Le champ du 'cout service' est vide");this.presentAlertPrompt(data.Service,"");return;}
          var Serv:Services={Active:false,Cout:data.Cout,Service:data.Service};
          if(this.Puser[0].MesServices==undefined)
          {this.Puser[0].MesServices=new Array();}
          this.Puser[0].MesServices.push(Serv);
          this.PS.updateProfessional(this.Puser[0],this.Puser[0].id);
        }
      }
    ]
  });

  await alert.present();
}

//end alert box
modifierCout(id){
  console.log((document.getElementById('cout'+id)as HTMLInputElement).value);
    if((document.getElementById('cout'+id)as HTMLInputElement).value==""){
      swal("Cout", "Le champ du 'cout service' est vide", "warning");return;

    }
    else if((document.getElementById('name'+id)as HTMLInputElement).value==""){
      swal("Cout", "Le champ du 'nom service' est vide", "warning");return;
    }
  this.Puser[0].MesServices[id].Cout=Number((document.getElementById('cout'+id)as HTMLInputElement).value);
  this.Puser[0].MesServices[id].Service=(document.getElementById('name'+id)as HTMLInputElement).value;
  this.PS.updateProfessional(this.Puser[0],this.Puser[0].id);
  swal("Le Service", "A été modifié avec succèe", "success");
}
supprimerService(id){
  swal({
    title: "Suppression",
    text: "Voulez vous Vraiment Supprimer cette Service ?",
    icon: "warning",
    buttons: ["Annuler", "Oui"],
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
    this.Puser[0].MesServices.splice(id,id);
    this.PS.updateProfessional(this.Puser[0],this.Puser[0].id);
      swal("Service Supprimé avec succée", {
        icon: "success",
      });

    } else {
      swal("Operation Annulé");
    }
  });
 }
 ActivateService(id)
 {if(this.Puser[0].MesServices[id].Active==true)
   {this.Puser[0].MesServices[id].Active=false;swal("Le Service", "A été Désactivé avec succès", "error");
  }
   else
   {this.Puser[0].MesServices[id].Active=true;swal("Le Service", "A été activé avec succès", "success");
  }
   this.PS.updateProfessional(this.Puser[0],this.Puser[0].id);
     
 }
test(){
  swal("Operation Annulé");
}
//notifications part
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
//end notif
}
