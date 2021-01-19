import { UploadService } from './../../../Services/upload.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { notification } from './../../../Services/notification.service';
import { professional,Client } from './../../../Services/professionnel.service';
import { Storage } from '@ionic/storage';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import { ProfessionnelService } from 'src/app/Services/professionnel.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ClientServiceService } from 'src/app/Services/client-service.service';

@Component({
  selector: 'app-liste-des-clients',
  templateUrl: './liste-des-clients.page.html',
  styleUrls: ['./liste-des-clients.page.scss'],
})
export class ListeDesClientsPage implements OnInit {
  sub:Subscription;
  hide=true;
  clientpass=true;
  Notif:notification[];
  notifstring:string[]=new Array();
  sub2:Subscription;
  Nom:string='';
  Prenom:string='';
  Email:string='';
  DateN:any;
  Gender:string;
  indexofClient:number=-1;
  NumT:string;
  Term: string = "";
  Puser:professional[];
  items: Client[];
  items2:any;
  constructor(private toast:ToastController,private CS:ClientServiceService,private upload:UploadService,private NS:NotificationService, private modalService: NgbModal,private menu:MenuController,private PS:ProfessionnelService,private storage:Storage,private nav:NavController) { }
  Cuser:any;
  
  ngOnInit() {
    this.sub2=this.NS.getNotif().subscribe((val)=>{
      this.Notif=val.reverse();
      
      this.showimg(this.Notif);
      });
    if(this.menu.isEnabled('Client'))
   {this.menu.enable(false,'Client');
   this.storage.get('Email').then((val)=>{
    this.sub=this.PS.ProfessionalExist(val).subscribe(res=>{
     this.Puser=res;
     this.items=res[0].mesClient;
     this.items2=this.items;
     console.log(res);
     });
    });

  }
  this.CS.getClients().subscribe(val=>{
       this.Cuser=val;
  })
  
}
openModal(content,Client) {
 
  if(Client=='Ajouter')
  { this.Nom=""
  this.Prenom=""
 
 this.Email=""
 this.DateN=""
 this.NumT=""
 this.Gender="";
 this.indexofClient=-1;

  }
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    
  }, (reason) => {

    if(reason=='Ajouter')
    {
      this.ajouterClient(Client);}

  });
  
}
ajouterClient(Client){
  console.log("here")
  this.modalService.open(Client, {ariaLabelledBy: 'ClientAj'}).result.then((result)=>{
   
  });
  
  }
  ionViewWillLeave(){
    this.menu.close();
    if(this.sub.closed!=true)
    {this.sub.unsubscribe();}
  }
  ionViewDidEnter(){
        
    this.menu.enable(true,'Professionnel');
  }
  DeleteClient(i)
  {
    swal({
    title: "Suppression",
    text: "Voulez vous Vraiment Supprimer Ce Client ?",
    icon: "warning",
    buttons: ["Annuler", "Oui"],
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
    console.log(i);
      this.Puser[0].mesClient.splice(i,1);
      this.items=this.Puser[0].mesClient;
      this.items2=this.items;
     
      //@ts-ignore
      this.PS.updateProfessional(this.Puser[0],this.Puser[0].id);
      swal("Client Supprimé avec succée", {
        icon: "success",
      });

    } else {
      swal("Operation Annulé");
    }
  });
   
  }
  filterItems(searchTerm) {
    return this.items.filter(item => {
      return item.Nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  setFilteredItems() {
    this.items=this.items2;
    this.items = this.filterItems(this.Term);
    
    
  }
  setvalues(i){
    this.Nom=this.items[i].Nom
    this.Prenom=this.items[i].Prenom
    this.Email=this.items[i].Email
    this.DateN={year:new Date(this.items[i].DateN).getFullYear(), month:(new Date(this.items[i].DateN).getMonth())+1, day:new Date(this.items[i].DateN).getDate()}
    this.NumT=this.items[i].NumT;
    this.Gender=this.items[i].Genre;
    this.indexofClient=i;
    
  }
  updateClient()
  { if(this.Nom.length==0)
    {swal("Champ 'nom' est vide ");return;}
    else if(this.Prenom.length==0)
    {swal("Champ 'prénom' est vide ");return;}
    else if(this.Email.length==0)
    {swal("Champ 'email' est vide ");return;}
    else if(!this.emailverif(this.Email))
    {swal("Cette email est invalide");return;}
    else if(this.Gender==undefined)
    {swal("Veuillez choisir un genre");return;}
    else if(this.DateN==undefined)
    {swal("Veuillez entrer le date de naissance");return;}
    else if(this.NumT=='')
    {swal("Champ 'Numéro téléphone' est vide ");return;}
    if(this.DateN.month<10&&this.DateN.day<10)
    { var ch:string=this.DateN.year+'-0'+this.DateN.month+'-0'+this.DateN.day;}
    else if(this.DateN.month<10)
    {var ch:string=this.DateN.year+'-0'+this.DateN.month+'-'+this.DateN.day;}
    else if(this.DateN.day<10)
    {var ch:string=this.DateN.year+'-'+this.DateN.month+'-0'+this.DateN.day;}
    else
    {var ch:string=this.DateN.year+'-'+this.DateN.month+'-'+this.DateN.day;}
      
    this.Puser[0].mesClient[this.indexofClient]={Token:'',Nom:this.Nom,Prenom:this.Prenom,Genre:this.Gender,Email:this.Email+'',NumT:this.NumT+"",DateN:ch}
    this.items=this.Puser[0].mesClient;
    this.items2=this.items;
    console.log(this.DateN);
    //@ts-ignore
  this.PS.updateProfessional(this.Puser[0],this.Puser[0].id);
  swal("Changements Enregistré avec succée", {
    icon: "success",
  });
  this.Nom=""
  this.Prenom=""
 this.Email=""
 this.DateN=""
 this.NumT=""
 this.Gender="";
 this.indexofClient=-1;
 this.modalService.dismissAll();
  }
  annule(){
    swal("Operation Annulé");
    this.Nom=""
  this.Prenom=""
 this.Email=""
 this.DateN=""
 this.NumT=""
 this.Gender="";
 this.indexofClient=-1;
  }
  async allpurpose(val) {
    const toast = await this.toast.create({
      message: val,
      duration: 2000
    });
    toast.present();
  }
  AddClient(){
    

   
    if(this.Nom.length==0)
    {swal("Champ 'nom' est vide ");return;}
    else if(this.Prenom.length==0)
    {swal("Champ 'prénom' est vide ");return;}
    else if(this.Email.length==0)
    {swal("Champ 'email' est vide ");return;}
    else if(!this.emailverif(this.Email))
    {swal("Cette email est invalide");return;}
    else if(this.Gender==undefined)
    {swal("Veuillez choisir un genre");return;}
    else if(this.DateN==undefined)
    {swal("Veuillez entrer le date de naissance");return;}
    else if(this.NumT=='')
    {swal("Champ 'Numéro téléphone' est vide ");return;}
   
    if(this.DateN.month<10&&this.DateN.day<10)
{ var ch:string=this.DateN.year+'-0'+this.DateN.month+'-0'+this.DateN.day;}
else if(this.DateN.month<10)
{var ch:string=this.DateN.year+'-0'+this.DateN.month+'-'+this.DateN.day;}
else if(this.DateN.day<10)
{var ch:string=this.DateN.year+'-'+this.DateN.month+'-0'+this.DateN.day;}
else
{var ch:string=this.DateN.year+'-'+this.DateN.month+'-'+this.DateN.day;}
  
    var NewC:Client={Token:'',Nom:this.Nom,Prenom:this.Prenom,Genre:this.Gender,Email:this.Email+'',NumT:this.NumT+"",DateN:ch};
  if(this.Puser[0].mesClient==undefined)
  {
    this.Puser[0].mesClient=new Array();
  }  
  this.Puser[0].mesClient.push(NewC);
  //@ts-ignore
  this.PS.updateProfessional(this.Puser[0],this.Puser[0].id);
  this.modalService.dismissAll();
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
  emailverif(data){
    var checkpass=new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
 var   ok=false;
     if(data!=undefined)
     {if(checkpass.test(data))
       {ok= true;}
     }
     return ok;
   }
  
}
