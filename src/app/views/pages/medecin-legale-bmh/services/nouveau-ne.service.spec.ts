import { TestBed } from '@angular/core/testing';

import { NouveauNeService } from './nouveau-ne.service';

describe('NouveauNeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NouveauNeService = TestBed.get(NouveauNeService);
    expect(service).toBeTruthy();
  });
});
