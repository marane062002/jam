import { TestBed } from '@angular/core/testing';

import { TraitementEffectueService } from './traitement-effectue.service';

describe('TraitementEffectueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TraitementEffectueService = TestBed.get(TraitementEffectueService);
    expect(service).toBeTruthy();
  });
});
