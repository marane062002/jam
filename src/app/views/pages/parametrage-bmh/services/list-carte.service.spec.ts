import { TestBed } from '@angular/core/testing';

import { ListCarteService } from './list-carte.service';

describe('ListCarteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListCarteService = TestBed.get(ListCarteService);
    expect(service).toBeTruthy();
  });
});
