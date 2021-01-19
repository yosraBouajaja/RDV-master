import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MesServicesPage } from './mes-services.page';

describe('MesServicesPage', () => {
  let component: MesServicesPage;
  let fixture: ComponentFixture<MesServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesServicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MesServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
