import { TestBed } from '@angular/core/testing';

import { ConsultationArchitecturalService } from './consultation-architectural.service';

describe('ConsultationArchitecturalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultationArchitecturalService = TestBed.get(ConsultationArchitecturalService);
    expect(service).toBeTruthy();
  });
});
