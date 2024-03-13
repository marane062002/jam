import { TestBed } from '@angular/core/testing';

import { FactureLANService } from './facture-lan.service';

describe('FactureLANService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FactureLANService = TestBed.get(FactureLANService);
    expect(service).toBeTruthy();
  });
});
