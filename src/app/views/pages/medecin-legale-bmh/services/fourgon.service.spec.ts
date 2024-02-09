import { TestBed } from '@angular/core/testing';

import { FourgonService } from './fourgon.service';

describe('FourgonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FourgonService = TestBed.get(FourgonService);
    expect(service).toBeTruthy();
  });
});
