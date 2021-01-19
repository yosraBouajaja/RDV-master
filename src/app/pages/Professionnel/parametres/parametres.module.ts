import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IonicModule } from '@ionic/angular';

import { ParametresPageRoutingModule } from './parametres-routing.module';

import { ParametresPage } from './parametres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,NgbModule,
    ParametresPageRoutingModule
  ],
  declarations: [ParametresPage]
})
export class ParametresPageModule {}
