import { Client, ClientServiceService } from './client-service.service';
import { time, ProfessionnelService } from './professionnel.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FcmService } from './fcm.service';
export interface notification{
currenttime:time;
takentime:time;
dateRDV:string;
client:Client;
message:string;
seen:boolean;
}
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private NotifCollection:AngularFirestoreCollection<notification>;
  private NotifCollection2:AngularFirestoreCollection<notification>;
  private Nlist:Observable<notification[]>;
  constructor(public db: AngularFirestore,private CS:ClientServiceService,private PS:ProfessionnelService,private fcm:FcmService) {
    this.NotifCollection =db.collection<notification>('Notifications');
    this.NotifCollection2 =db.collection<notification>('test');
    this.Nlist =this.NotifCollection.snapshotChanges().pipe(
      map(actions => {
         return actions.map(a =>{
               const data = a.payload.doc.data();
               const id = a.payload.doc.id;
               return { id, ...data};
         });
      })
    );
   }
   updateNotif(Nlist:notification,id:string){
    return this.NotifCollection.doc(id).update(Nlist);
    }
    addNotif(Nlist:notification){
      return this.NotifCollection.add(Nlist);
      }
      getNotif()
             {
             return this.Nlist;
             }
             addNotif2(Nlist){
              return this.NotifCollection2.add(Nlist);
             }

             ReporterRDV(Temps:time,Cuser,Puser,TDate,Email){
              
              console.log(Temps,Cuser,Puser,TDate,Email);
              for (let i = 0; i < Cuser[0].mesRDV.length; i++) {
                if(Cuser[0].mesRDV[i].Date==TDate)
                { var oldRDV:time={hour:Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.hour
                ,minute:Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.minute,second:0};
                  Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.hour=Temps.hour;
                  Cuser[0].mesRDV[i].ClientsRDVs[0].tempsRDV.minute=Temps.minute;
                } 
              }
              for (let i = 0; i < Puser[0].Rendez_vous.length; i++) {
                if(Puser[0].Rendez_vous[i].Date==TDate)
                {for (let j = 0; j < Puser[0].Rendez_vous[i].ClientsRDVs.length; j++) {
                 if(Puser[0].Rendez_vous[i].ClientsRDVs[j].index.Email==Email)
                 {console.log('found email');
                 
                 Puser[0].Rendez_vous[i].ClientsRDVs[j].tempsRDV.hour=Temps.hour;
                 Puser[0].Rendez_vous[i].ClientsRDVs[j].tempsRDV.minute=Temps.minute;
                 }
                }  
                }
              
   
              }
           var time={heure:oldRDV.hour,minute:oldRDV.minute}
              var useddata={operation:'decalage',Temps:time,date:TDate}
              var data={"FcmToken":['euCC7AIMhzc:APA91bHgL3LrWA4Glz-qDMlJ9Okc6nmhea0026HK9896Wq71-gXKY9JugffRjXCB7-mcgIMzBOJ05eHCjYEIjQUdq2Nr8J7fxqQ-Qu6YQyjCeVUj05wF8SiglRE3wAW6cmRkU_rzx42V'],
              "title":"Reporter",
              "body":"Voulez Vous Reporter Votre Rendez-Vous a "+time.heure+':'+time.minute,
              useddata};
              this.addNotif2(data);
            this.fcm.Send(data);
              console.log(Cuser[0].mesRDV[0].ClientsRDVs[0]);
               //@ts-ignore
               this.CS.updateClient(Cuser[0],Cuser[0].id)
               //@ts-ignore
               this.PS.updateProfessional(Puser[0],Puser[0].id);
               }
}
