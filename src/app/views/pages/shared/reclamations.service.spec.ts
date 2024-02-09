import { TestBed } from '@angular/core/testing';

import { ReclamationsService } from './reclamations.service';

describe('ReclamationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReclamationsService = TestBed.get(ReclamationsService);
    expect(service).toBeTruthy();
  });
});
