import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface user{

}
@Injectable({
  providedIn: 'root'
})
export class UserService {
private UlistCollection:AngularFirestoreCollection<user>;
private QUser:Observable<user[]>; 
  constructor(public db: AngularFirestore) {
    this.UlistCollection =db.collection<user>('Users');
   }
   GetUser(id){
    this.QUser=this.db.collection<user>("Users",ref=>ref.where('uid','==',id)).valueChanges();
    return this.QUser;
  }
  updateUser(Ulist:user,id:string){
    return this.UlistCollection.doc(id).update(Ulist);
}

removeUser(id:string){
  return this.UlistCollection.doc(id).delete();
}

addUser(Ulist:user){
  return this.UlistCollection.add(Ulist);
}
GetUserbyID(id){
  return this.UlistCollection.doc<user>(id).valueChanges();
  }
}
