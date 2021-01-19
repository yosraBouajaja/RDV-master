import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesServicesPageRoutingModule } from './mes-services-routing.module';

import { MesServicesPage } from './mes-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesServicesPageRoutingModule
  ],
  declarations: [MesServicesPage]
})
export class MesServicesPageModule {}
