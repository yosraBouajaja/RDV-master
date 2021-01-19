import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesRDVPage } from './mes-rdv.page';

const routes: Routes = [
  {
    path: '',
    component: MesRDVPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesRDVPageRoutingModule {}
