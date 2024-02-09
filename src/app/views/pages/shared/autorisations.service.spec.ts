import { TestBed } from '@angular/core/testing';

import { AutorisationsService } from './autorisations.service';

describe('AutorisationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutorisationsService = TestBed.get(AutorisationsService);
    expect(service).toBeTruthy();
  });
});
