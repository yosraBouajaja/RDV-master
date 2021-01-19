import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyrdvPage } from './myrdv.page';

const routes: Routes = [
  {
    path: '',
    component: MyrdvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyrdvPageRoutingModule {}
