import { TestBed } from '@angular/core/testing';

import { LigneDemandeFournitureService } from './ligne-demande-fourniture.service';

describe('LigneDemandeFournitureService', () => {
  let service: LigneDemandeFournitureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigneDemandeFournitureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
