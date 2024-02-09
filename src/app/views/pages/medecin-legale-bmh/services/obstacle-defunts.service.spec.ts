import { TestBed } from '@angular/core/testing';

import { ObstacleDefuntsService } from './obstacle-defunts.service';

describe('ObstacleDefuntsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObstacleDefuntsService = TestBed.get(ObstacleDefuntsService);
    expect(service).toBeTruthy();
  });
});
