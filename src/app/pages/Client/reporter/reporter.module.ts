import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporterPageRoutingModule } from './reporter-routing.module';

import { ReporterPage } from './reporter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporterPageRoutingModule
  ],
  declarations: [ReporterPage]
})
export class ReporterPageModule {}
