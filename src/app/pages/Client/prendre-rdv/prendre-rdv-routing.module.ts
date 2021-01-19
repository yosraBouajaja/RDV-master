import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrendreRDVPage } from './prendre-rdv.page';

const routes: Routes = [
  {
    path: '',
    component: PrendreRDVPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrendreRDVPageRoutingModule {}
