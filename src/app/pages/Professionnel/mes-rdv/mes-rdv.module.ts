import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IonicModule } from '@ionic/angular';

import { MesRDVPageRoutingModule } from './mes-rdv-routing.module';

import { MesRDVPage } from './mes-rdv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesRDVPageRoutingModule,
    NgbModule
  ],
  declarations: [MesRDVPage]
})
export class MesRDVPageModule {}
