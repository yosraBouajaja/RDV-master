import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CmesRDVPage } from './cmes-rdv.page';

const routes: Routes = [
  {
    path: '',
    component: CmesRDVPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmesRDVPageRoutingModule {}
