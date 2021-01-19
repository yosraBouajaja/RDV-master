import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HorairePage } from './horaire.page';

describe('HorairePage', () => {
  let component: HorairePage;
  let fixture: ComponentFixture<HorairePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorairePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HorairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
