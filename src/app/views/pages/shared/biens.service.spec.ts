import { TestBed } from '@angular/core/testing';

import { BiensService } from './biens.service';

describe('BiensService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BiensService = TestBed.get(BiensService);
    expect(service).toBeTruthy();
  });
});
