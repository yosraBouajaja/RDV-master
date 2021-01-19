import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CProfilePage } from './cprofile.page';

describe('CProfilePage', () => {
  let component: CProfilePage;
  let fixture: ComponentFixture<CProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
