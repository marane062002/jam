import { TestBed } from '@angular/core/testing';

import { EspeceService } from './espece.service';

describe('EspeceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EspeceService = TestBed.get(EspeceService);
    expect(service).toBeTruthy();
  });
});
