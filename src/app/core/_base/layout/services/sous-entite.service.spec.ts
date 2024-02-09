import { TestBed } from '@angular/core/testing';

import { SousEntiteService } from './sous-entite.service';

describe('SousEntiteService', () => {
  let service: SousEntiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SousEntiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
