import { Injectable } from '@angular/core';
import { RDV } from './professionnel.service';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Client{
  nom:string;
  prenom:string;
  Level:number;
  DateN:string;
  NumT:number;
  img:string;
  Genre:string;
  Email:string;
  token:string;
  mesRDV:RDV[];
} 
@Injectable({
  providedIn: 'root'
})

export class ClientServiceService {
  private ClistCollection:AngularFirestoreCollection<Client>; 
  private Clist:Observable<Client[]>;
  private Exist:Observable<Client[]>;
  constructor(public db: AngularFirestore) {
    this.ClistCollection =db.collection<Client>('Client');
    this.Clist =this.ClistCollection.snapshotChanges().pipe(
      map(actions => {
         return actions.map(a =>{
               const data = a.payload.doc.data();
               const id = a.payload.doc.id;
               return { id, ...data};
         });
      })
    );
   }
         addClient(Clist:Client){
          return this.ClistCollection.add(Clist);
          }
         updateClient(Plist:Client,id:string){
            return this.ClistCollection.doc(id).update(Plist);
            }
          removeClient(id:string){
            return this.ClistCollection.doc(id).delete();
            }
          GetClient(id){
             return this.ClistCollection.doc<Client>(id).valueChanges();
             }
          getClients()
             {
             return this.Clist;
             }
             ClientExist(email:string){
              this.Exist=this.db.collection<Client>("Client",ref=>ref.where('Email','==',email)).snapshotChanges().pipe(
                map(actions => actions.map(a => {
                  const data = a.payload.doc.data() ;
                  const id = a.payload.doc.id;
                  return { id, ...data };
                }))
              );
              return this.Exist;
            }
}
