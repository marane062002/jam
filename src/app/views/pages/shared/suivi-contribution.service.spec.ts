import { TestBed } from '@angular/core/testing';

import { SuiviContributionService } from './suivi-contribution.service';

describe('SuiviContributionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuiviContributionService = TestBed.get(SuiviContributionService);
    expect(service).toBeTruthy();
  });
});
