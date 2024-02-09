import { TestBed } from '@angular/core/testing';

import { QuantiteService } from './quantite.service';

describe('QuantiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuantiteService = TestBed.get(QuantiteService);
    expect(service).toBeTruthy();
  });
});
