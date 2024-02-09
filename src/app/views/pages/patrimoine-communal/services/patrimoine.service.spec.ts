import { TestBed } from '@angular/core/testing';

import { PatrimoineService } from './patrimoine.service';

describe('PatrimoineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatrimoineService = TestBed.get(PatrimoineService);
    expect(service).toBeTruthy();
  });
});
