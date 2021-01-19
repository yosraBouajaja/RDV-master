import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeDesClientsPage } from './liste-des-clients.page';

describe('ListeDesClientsPage', () => {
  let component: ListeDesClientsPage;
  let fixture: ComponentFixture<ListeDesClientsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeDesClientsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeDesClientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
