
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface notif{
  FcmToken:string[];
  title:string;
  body:string;
  data:any;
}
@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private https:HttpClient) { }

/*
// lezem tkoun haka data 
var data={"FcmToken":['euCC7AIMhzc:APA91bHgL3LrWA4Glz-qDMlJ9Okc6nmhea0026HK9896Wq71-gXKY9JugffRjXCB7-mcgIMzBOJ05eHCjYEIjQUdq2Nr8J7fxqQ-Qu6YQyjCeVUj05wF8SiglRE3wAW6cmRkU_rzx42V'],
  "title":"Reporter",
  "body":"Voulez Vous Reporter Votre Rendez-Vous a ",
  };
*/
  public Send(data){
  return  this.https.post('http://51.210.180.156:1717/send-push',data).subscribe();
  }
}
