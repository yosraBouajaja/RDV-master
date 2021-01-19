import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporterPage } from './reporter.page';

const routes: Routes = [
  {
    path: '',
    component: ReporterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporterPageRoutingModule {}
