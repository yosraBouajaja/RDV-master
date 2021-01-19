import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IonicModule } from '@ionic/angular';

import { ListeDesClientsPageRoutingModule } from './liste-des-clients-routing.module';

import { ListeDesClientsPage } from './liste-des-clients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,NgbModule,
    IonicModule,
    ListeDesClientsPageRoutingModule
  ],
  declarations: [ListeDesClientsPage]
})
export class ListeDesClientsPageModule {}
