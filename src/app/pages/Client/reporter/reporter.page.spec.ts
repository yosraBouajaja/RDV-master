import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReporterPage } from './reporter.page';

describe('ReporterPage', () => {
  let component: ReporterPage;
  let fixture: ComponentFixture<ReporterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReporterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
