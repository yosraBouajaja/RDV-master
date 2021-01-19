import { Component, OnInit } from '@angular/core';
import { NavController,ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth} from '@angular/fire/auth';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public Authe:AngularFireAuth,private storage:Storage,private nav:NavController,private toast:ToastController) { }

  ngOnInit() {
    this.storage.clear();
    
    this.Authe.auth.signOut();
    this.nav.navigateRoot('login');
    this.Disconnected();
  }
  async Disconnected() {
    const toast = await this.toast.create({
      message: "Déconnecté",
      duration: 4000
    });
    toast.present();
  }
}
