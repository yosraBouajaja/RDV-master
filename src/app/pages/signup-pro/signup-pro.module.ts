import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupProPageRoutingModule } from './signup-pro-routing.module';

import { SignupProPage } from './signup-pro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupProPageRoutingModule
  ],
  declarations: [SignupProPage]
})
export class SignupProPageModule {}
