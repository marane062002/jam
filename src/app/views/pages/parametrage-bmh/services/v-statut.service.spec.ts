import { TestBed } from '@angular/core/testing';

import { VStatutService } from './v-statut.service';

describe('VStatutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VStatutService = TestBed.get(VStatutService);
    expect(service).toBeTruthy();
  });
});
