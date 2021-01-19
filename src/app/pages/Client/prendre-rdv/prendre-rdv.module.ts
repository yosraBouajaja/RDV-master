import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrendreRDVPageRoutingModule } from './prendre-rdv-routing.module';

import { PrendreRDVPage } from './prendre-rdv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrendreRDVPageRoutingModule
  ],
  declarations: [PrendreRDVPage]
})
export class PrendreRDVPageModule {}
