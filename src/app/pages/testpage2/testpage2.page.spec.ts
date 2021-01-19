import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Testpage2Page } from './testpage2.page';

describe('Testpage2Page', () => {
  let component: Testpage2Page;
  let fixture: ComponentFixture<Testpage2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Testpage2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Testpage2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
