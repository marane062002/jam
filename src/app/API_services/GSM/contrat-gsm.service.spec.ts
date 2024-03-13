import { TestBed } from '@angular/core/testing';

import { ContratGSMService } from './contrat-gsm.service';

describe('ContratGSMService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContratGSMService = TestBed.get(ContratGSMService);
    expect(service).toBeTruthy();
  });
});
