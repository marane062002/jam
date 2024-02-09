import { TestBed } from '@angular/core/testing';

import { EtablisService } from './etablis.service';

describe('EtablisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EtablisService = TestBed.get(EtablisService);
    expect(service).toBeTruthy();
  });
});
