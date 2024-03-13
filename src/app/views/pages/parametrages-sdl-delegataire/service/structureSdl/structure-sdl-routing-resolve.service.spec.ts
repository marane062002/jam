import { TestBed } from '@angular/core/testing';

import { StructureSdlRoutingResolveService } from './structure-sdl-routing-resolve.service';

describe('StructureSdlRoutingResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StructureSdlRoutingResolveService = TestBed.get(StructureSdlRoutingResolveService);
    expect(service).toBeTruthy();
  });
});
