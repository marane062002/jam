import { TestBed } from '@angular/core/testing';

import { ArreteFiscalService } from './arrete-fiscal.service';

describe('ArreteFiscalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArreteFiscalService = TestBed.get(ArreteFiscalService);
    expect(service).toBeTruthy();
  });
});
