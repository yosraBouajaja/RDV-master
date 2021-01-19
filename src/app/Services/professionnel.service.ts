import { FcmService, notif } from './fcm.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection,AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

export interface time{
hour:number;
minute:number;
second:number;
}
export interface Services{
  Service:string;
  Cout:number;
  Active:boolean;
}
export interface parametres{
  Active:boolean;
  Description:string;
  img:string;
  Duree:time;
  WaitTime:time;
  StartMorning:time;
  EndMorning:time;
  StartEvening:time;
  EndEvening:time;
}
export interface Client{
  Nom:string;
  Prenom:string;
  NumT:string;
  Token:string;
  DateN:string;
  Genre:string;
  Email:string;
}
export interface RDVaujordui{
tempsRDV:time;
index:Client;
Service:Services[];
hasAccount:boolean;
}
export interface RDV{
Date:string;
ClientsRDVs:RDVaujordui[];
}
export interface professional{
  nom:string;
  prenom:string;
  DateN:string;
  NumT:number;
  NumF:number;
  img:string;
  Genre:string;
  Profession:string;
  Email:string;
  Level:number;
  token:string;
  mesClient:Client[];
  Rendez_vous:RDV[];
  param:parametres;
  MesServices:Services[];
}
@Injectable({
  providedIn: 'root'
})

export class ProfessionnelService {
  private UlistCollection:AngularFirestoreCollection<professional>;
  private UlistCollection2:AngularFirestoreCollection<professional>;
  private QUser:Observable<professional[]>; 
  private allprofessionals:Observable<professional[]>; 
    constructor(public db: AngularFirestore,private fcm:FcmService) {
      this.UlistCollection =db.collection<professional>('Professional');
      this.UlistCollection2 =db.collection<professional>('Professional');
      this.allprofessionals =this.UlistCollection.snapshotChanges().pipe(
        map(actions => {
           return actions.map(a =>{
                 const data = a.payload.doc.data();
                 const id = a.payload.doc.id;
                 return { id, ...data};
           });
        })
      );
     }
     getallprofessionals(){
       return this.allprofessionals;
     }
  GetProfessional(id:string){
  this.QUser=this.db.collection<professional>("Users",ref=>ref.where('uid','==',id)).valueChanges();
  return this.QUser;
    }
  updateProfessional(Ulist:professional,id:string){
      this.UlistCollection2.doc(id).update(Ulist);
  }
 
  removeProfessional(id:string){
    return this.UlistCollection.doc(id).delete();
  }
  
  addProfessional(Ulist:professional){
    return this.UlistCollection.add(Ulist);
  }

  GetProfessionalbyID(id:string){
    return this.UlistCollection.doc<professional>(id).valueChanges();
    }

  ProfessionalExist(email:string){
    this.QUser=this.db.collection<professional>("Professional",ref=>ref.where('Email','==',email)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.QUser;
  }
  ConfirmerPresence(data){
   this.fcm.Send(data);
  }
  
}
