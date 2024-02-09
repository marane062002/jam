import { TestBed } from '@angular/core/testing';

import { CommissionCaService } from './commission-ca.service';

describe('CommissionCaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommissionCaService = TestBed.get(CommissionCaService);
    expect(service).toBeTruthy();
  });
});
