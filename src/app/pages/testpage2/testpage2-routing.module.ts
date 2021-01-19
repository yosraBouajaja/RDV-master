import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Testpage2Page } from './testpage2.page';

const routes: Routes = [
  {
    path: '',
    component: Testpage2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Testpage2PageRoutingModule {}
