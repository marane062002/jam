import { TestBed } from '@angular/core/testing';

import { AvanceConventionService } from './avance-convention.service';

describe('AvanceConventionService', () => {
  let service: AvanceConventionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvanceConventionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
