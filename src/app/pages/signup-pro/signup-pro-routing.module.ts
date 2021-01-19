import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupProPage } from './signup-pro.page';

const routes: Routes = [
  {
    path: '',
    component: SignupProPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupProPageRoutingModule {}
