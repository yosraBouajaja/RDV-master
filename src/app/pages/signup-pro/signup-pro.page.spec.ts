import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignupProPage } from './signup-pro.page';

describe('SignupProPage', () => {
  let component: SignupProPage;
  let fixture: ComponentFixture<SignupProPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupProPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupProPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
