import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyrdvPage } from './myrdv.page';

describe('MyrdvPage', () => {
  let component: MyrdvPage;
  let fixture: ComponentFixture<MyrdvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyrdvPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyrdvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
