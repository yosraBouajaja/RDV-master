import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesServicesPage } from './mes-services.page';

const routes: Routes = [
  {
    path: '',
    component: MesServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesServicesPageRoutingModule {}
