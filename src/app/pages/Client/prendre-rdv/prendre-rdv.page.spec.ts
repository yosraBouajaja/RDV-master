import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrendreRDVPage } from './prendre-rdv.page';

describe('PrendreRDVPage', () => {
  let component: PrendreRDVPage;
  let fixture: ComponentFixture<PrendreRDVPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrendreRDVPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrendreRDVPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
