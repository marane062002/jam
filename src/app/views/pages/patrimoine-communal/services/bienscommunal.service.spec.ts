import { TestBed } from '@angular/core/testing';

import { BienscommunalService } from './bienscommunal.service';

describe('BienscommunalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BienscommunalService = TestBed.get(BienscommunalService);
    expect(service).toBeTruthy();
  });
});
