import { TestBed } from '@angular/core/testing';

import { QuantiteReapprovisionnementService } from './quantite-reapprovisionnement.service';

describe('QuantiteReapprovisionnementService', () => {
  let service: QuantiteReapprovisionnementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuantiteReapprovisionnementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
