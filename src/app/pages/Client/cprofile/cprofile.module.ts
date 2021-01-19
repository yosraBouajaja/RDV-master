import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CProfilePageRoutingModule } from './cprofile-routing.module';

import { CProfilePage } from './cprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CProfilePageRoutingModule
  ],
  declarations: [CProfilePage]
})
export class CProfilePageModule {}
