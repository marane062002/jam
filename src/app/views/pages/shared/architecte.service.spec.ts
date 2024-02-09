import { TestBed } from '@angular/core/testing';

import { ArchitecteService } from './architecte.service';

describe('ArchitecteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArchitecteService = TestBed.get(ArchitecteService);
    expect(service).toBeTruthy();
  });
});
