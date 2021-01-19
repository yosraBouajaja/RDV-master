import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IonicModule } from '@ionic/angular';

import { MyrdvPageRoutingModule } from './myrdv-routing.module';

import { MyrdvPage } from './myrdv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,NgbModule,
    MyrdvPageRoutingModule
  ],
  declarations: [MyrdvPage]
})
export class MyrdvPageModule {}
