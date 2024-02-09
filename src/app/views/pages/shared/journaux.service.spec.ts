import { TestBed } from '@angular/core/testing';

import { JournauxService } from './journaux.service';

describe('JournauxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JournauxService = TestBed.get(JournauxService);
    expect(service).toBeTruthy();
  });
});
