import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HorairePage } from './horaire.page';

const routes: Routes = [
  {
    path: '',
    component: HorairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorairePageRoutingModule {}
