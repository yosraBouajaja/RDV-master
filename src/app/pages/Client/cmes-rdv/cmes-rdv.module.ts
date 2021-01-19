import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CmesRDVPageRoutingModule } from './cmes-rdv-routing.module';

import { CmesRDVPage } from './cmes-rdv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CmesRDVPageRoutingModule
  ],
  declarations: [CmesRDVPage]
})
export class CmesRDVPageModule {}
