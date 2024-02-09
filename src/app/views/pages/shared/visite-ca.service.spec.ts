import { TestBed } from '@angular/core/testing';

import { VisiteCaService } from './visite-ca.service';

describe('VisiteCaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisiteCaService = TestBed.get(VisiteCaService);
    expect(service).toBeTruthy();
  });
});
