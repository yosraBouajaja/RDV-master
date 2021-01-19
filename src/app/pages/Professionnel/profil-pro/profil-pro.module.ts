import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilProPageRoutingModule } from './profil-pro-routing.module';

import { ProfilProPage } from './profil-pro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilProPageRoutingModule
  ],
  declarations: [ProfilProPage]
})
export class ProfilProPageModule {}
