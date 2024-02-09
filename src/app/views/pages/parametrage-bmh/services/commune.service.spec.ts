import { TestBed } from '@angular/core/testing';

import { CommuneService } from './commune.service';

describe('CommuneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommuneService = TestBed.get(CommuneService);
    expect(service).toBeTruthy();
  });
});
