import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeDesClientsPage } from './liste-des-clients.page';

const routes: Routes = [
  {
    path: '',
    component: ListeDesClientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeDesClientsPageRoutingModule {}
