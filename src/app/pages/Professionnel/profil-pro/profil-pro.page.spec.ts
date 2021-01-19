import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilProPage } from './profil-pro.page';

describe('ProfilProPage', () => {
  let component: ProfilProPage;
  let fixture: ComponentFixture<ProfilProPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilProPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilProPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
