import { TestBed } from '@angular/core/testing';

import { FactureGSMService } from './facture-gsm.service';

describe('FactureGSMService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FactureGSMService = TestBed.get(FactureGSMService);
    expect(service).toBeTruthy();
  });
});
