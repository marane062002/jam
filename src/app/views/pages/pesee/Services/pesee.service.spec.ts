import { TestBed } from '@angular/core/testing';

import { PeseeService } from './pesee.service';

describe('PeseeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeseeService = TestBed.get(PeseeService);
    expect(service).toBeTruthy();
  });
});
