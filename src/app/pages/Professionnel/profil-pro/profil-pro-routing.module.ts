import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilProPage } from './profil-pro.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilProPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilProPageRoutingModule {}
