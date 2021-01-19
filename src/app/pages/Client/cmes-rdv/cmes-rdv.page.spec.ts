import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CmesRDVPage } from './cmes-rdv.page';

describe('CmesRDVPage', () => {
  let component: CmesRDVPage;
  let fixture: ComponentFixture<CmesRDVPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmesRDVPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CmesRDVPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
