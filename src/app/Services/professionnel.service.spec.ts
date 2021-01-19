import { TestBed } from '@angular/core/testing';

import { ProfessionnelService } from './professionnel.service';

describe('ProfessionnelService', () => {
  let service: ProfessionnelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionnelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
