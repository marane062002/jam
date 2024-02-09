import { TestBed } from '@angular/core/testing';

import { TypeExamenService } from './type-examen.service';

describe('TypeExamenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeExamenService = TestBed.get(TypeExamenService);
    expect(service).toBeTruthy();
  });
});
