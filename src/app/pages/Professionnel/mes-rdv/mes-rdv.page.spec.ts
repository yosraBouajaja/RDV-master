import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MesRDVPage } from './mes-rdv.page';

describe('MesRDVPage', () => {
  let component: MesRDVPage;
  let fixture: ComponentFixture<MesRDVPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesRDVPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MesRDVPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
