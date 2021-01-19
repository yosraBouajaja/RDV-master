import { ClientServiceService } from 'src/app/Services/client-service.service';
import { Client } from './client-service.service';
import { ProfessionnelService, professional } from './professionnel.service';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Injectable } from '@angular/core';

export interface MyData {
  name: string;
  filepath: string;
  size: number;
}
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  // Upload Task 
 task: AngularFireUploadTask;

 // Progress in percentage
 percentage: Observable<number>;

 // Snapshot of uploading file
 snapshot: Observable<any>;

 // Uploaded File URL
 UploadedFileURL: Observable<string>;

 //Uploaded Image List
 images: Observable<MyData[]>;

 //File details  
 fileName:string;
 fileSize:number;
 userProfileImg:any;
 //Status check 
 isUploading:boolean;
 isUploaded:boolean;

  constructor(private storage: AngularFireStorage,private PS:ProfessionnelService,private CS:ClientServiceService) { 
    this.isUploading = false;
    this.isUploaded = false;
    
  }
  getProfileImageUrl(userId: string) {
    const userStorageRef = this.storage.storage.ref().child('userProfiles/'+userId);
    return userStorageRef;
  }
  //upload client image
  uploadImage2(event: FileList,Cuser:Client[]) {
    

    // The File object
    const file = event.item(0)
  
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
     console.error('unsupported file type :( ')
     return;
    }
  
    this.isUploading = true;
    this.isUploaded = false;
  
  
    this.fileName = file.name;
   console.log(file.name);
    // The storage path
    const path = `userProfiles/${file.name}`;
  
    // Totally optional metadata
    const customMetadata = { app: 'User Profile pic' };
  
    //File reference
    const fileRef = this.storage.ref(path);
  
    // The main task
     this.storage.upload(path, file, { customMetadata }).then((val)=>{
       if(Cuser[0].img!='avatar7.png')
      {this.deletepic(Cuser[0].img);}
      console.log(val);
      Cuser[0].img=`${file.name}`;
      //@ts-ignore
      this.CS.updateClient(Cuser[0],Cuser[0].id);
    });
   
    
    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    console.log('here');
    
  }
  //upload professional image
  uploadImage(event: FileList,Puser:professional[]) {
    

    // The File object
    const file = event.item(0)
  
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
     console.error('unsupported file type :( ')
     return;
    }
  
    this.isUploading = true;
    this.isUploaded = false;
  
  
    this.fileName = file.name;
   console.log(file.name);
    // The storage path
    const path = `userProfiles/${file.name}`;
  
    // Totally optional metadata
    const customMetadata = { app: 'User Profile pic' };
  
    //File reference
    const fileRef = this.storage.ref(path);
  
    // The main task
     this.storage.upload(path, file, { customMetadata }).then((val)=>{
      if(Puser[0].param.img!='avatar7.png')
      {this.deletepic(Puser[0].param.img);}
     
      Puser[0].param.img=`${file.name}`;
      //@ts-ignore
      this.PS.updateProfessional(Puser[0],Puser[0].id);
    });
   
    
    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    console.log('here');
    
  }
 
    deletepic(refrence){
      var desertRef = this.storage.storage.ref().child('userProfiles/'+refrence);
    
      // Delete the file
      desertRef.delete().then(function() {
        // File deleted successfully
      }).catch(function(error) {
        // Uh-oh, an error occurred!
      });
     
  }
}
