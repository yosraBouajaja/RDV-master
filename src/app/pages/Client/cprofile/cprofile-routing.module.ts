import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CProfilePage } from './cprofile.page';

const routes: Routes = [
  {
    path: '',
    component: CProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CProfilePageRoutingModule {}
