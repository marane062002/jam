import { TestBed } from '@angular/core/testing';

import { TypeControleService } from './type-controle.service';

describe('TypeControleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeControleService = TestBed.get(TypeControleService);
    expect(service).toBeTruthy();
  });
});
