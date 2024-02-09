import { TestBed } from '@angular/core/testing';

import { AutopsieService } from './autopsie.service';

describe('AutopsieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutopsieService = TestBed.get(AutopsieService);
    expect(service).toBeTruthy();
  });
});
