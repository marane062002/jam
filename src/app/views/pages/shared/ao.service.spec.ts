import { TestBed } from '@angular/core/testing';

import { AoService } from './ao.service';

describe('AoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AoService = TestBed.get(AoService);
    expect(service).toBeTruthy();
  });
});
