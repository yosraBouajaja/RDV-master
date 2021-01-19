import { professional } from 'src/app/Services/professionnel.service';
import { ProfessionnelService, RDVaujordui } from './../../Services/professionnel.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FcmService } from './../../Services/fcm.service';
import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { tap } from 'rxjs/operators'
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';
const { PushNotifications } = Plugins;
export interface MyData {
  name: string;
  filepath: string;
  size: number;
}
const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.page.html',
  styleUrls: ['./testpage.page.scss'],
})
export class TestpagePage implements OnInit {
   data={"FcmToken":["123456789","123466789"],"body":"Test Test Test","title":"this is a test"};
P:professional;
ngOnInit(){
  console.log(isPushNotificationsAvailable);
this.PS.getallprofessionals().subscribe((val)=>{
this.P=val[0];
});
 

}

constructor(private PS:ProfessionnelService,private fcm:FcmService, private https:HttpClient,private afMessaging: AngularFireMessaging) {
 
  
 }
 calculateminutes(hour:number,minute:number)
 {
   return (hour*60)+minute;
 }
 bubbleSort(RDV:RDVaujordui[]){
  if(RDV!=undefined){
   var len = RDV.length;
   for (var i = len-1; i>=0; i--){
     for(var j = 1; j<=i; j++){
       if( this.calculateminutes(RDV[j-1].tempsRDV.hour,RDV[j-1].tempsRDV.hour)
         >this.calculateminutes(RDV[j].tempsRDV.hour,RDV[j].tempsRDV.minute)
         ){
           var temp = RDV[j-1];
           RDV[j-1] = RDV[j];
           RDV[j] = temp;
        }
     }
   }
   return RDV;
 }
}
 test2(){
console.log((this.P.Rendez_vous[0].ClientsRDVs[0].index.Email),this.P.Rendez_vous[0].ClientsRDVs[0].tempsRDV.hour,":",this.P.Rendez_vous[0].ClientsRDVs[0].tempsRDV.minute);
console.log((this.P.Rendez_vous[0].ClientsRDVs[1].index.Email),this.P.Rendez_vous[0].ClientsRDVs[1].tempsRDV.hour,":",this.P.Rendez_vous[0].ClientsRDVs[1].tempsRDV.minute);
console.log((this.P.Rendez_vous[0].ClientsRDVs[2].index.Email),this.P.Rendez_vous[0].ClientsRDVs[2].tempsRDV.hour,":",this.P.Rendez_vous[0].ClientsRDVs[2].tempsRDV.minute);

this.P.Rendez_vous[0].ClientsRDVs=this.bubbleSort(this.P.Rendez_vous[0].ClientsRDVs)
console.log("----------------------");
console.log((this.P.Rendez_vous[0].ClientsRDVs[0].index.Email),this.P.Rendez_vous[0].ClientsRDVs[0].tempsRDV.hour,":",this.P.Rendez_vous[0].ClientsRDVs[0].tempsRDV.minute);
console.log((this.P.Rendez_vous[0].ClientsRDVs[1].index.Email),this.P.Rendez_vous[0].ClientsRDVs[1].tempsRDV.hour,":",this.P.Rendez_vous[0].ClientsRDVs[1].tempsRDV.minute);
console.log((this.P.Rendez_vous[0].ClientsRDVs[2].index.Email),this.P.Rendez_vous[0].ClientsRDVs[2].tempsRDV.hour,":",this.P.Rendez_vous[0].ClientsRDVs[2].tempsRDV.minute);


 }
 test(){
   var listeClient=new Array()
   listeClient.push('1')
   listeClient.push('2')
   listeClient.push('3')
   var time={heure:'23',minute:'30'}
  var useddata={operation:'decalage',Temps:time,date:'2021-01-05'}
  var data={"FcmToken":['euCC7AIMhzc:APA91bHgL3LrWA4Glz-qDMlJ9Okc6nmhea0026HK9896Wq71-gXKY9JugffRjXCB7-mcgIMzBOJ05eHCjYEIjQUdq2Nr8J7fxqQ-Qu6YQyjCeVUj05wF8SiglRE3wAW6cmRkU_rzx42V'],
  "title":"Reporter",
  "body":"Voulez Vous Reporter Votre Rendez-Vous a "+time.heure+':'+time.minute,
  useddata};
  
  console.log(this.fcm.Send(data));
 }
}
