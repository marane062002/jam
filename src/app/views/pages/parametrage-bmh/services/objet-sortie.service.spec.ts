import { TestBed } from '@angular/core/testing';

import { ObjetSortieService } from './objet-sortie.service';

describe('ObjetSortieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObjetSortieService = TestBed.get(ObjetSortieService);
    expect(service).toBeTruthy();
  });
});
