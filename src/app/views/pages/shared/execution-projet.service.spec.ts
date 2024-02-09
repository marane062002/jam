import { TestBed } from '@angular/core/testing';

import { ExecutionProjetService } from './execution-projet.service';

describe('ExecutionProjetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExecutionProjetService = TestBed.get(ExecutionProjetService);
    expect(service).toBeTruthy();
  });
});
