import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IonicModule } from '@ionic/angular';

import { Testpage2PageRoutingModule } from './testpage2-routing.module';
import { Testpage2Page } from './testpage2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Testpage2PageRoutingModule,
    NgbModule
  ],
  declarations: [Testpage2Page]
})
export class Testpage2PageModule {}
