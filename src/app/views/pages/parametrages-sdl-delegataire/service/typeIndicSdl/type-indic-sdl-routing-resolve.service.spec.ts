import { TestBed } from '@angular/core/testing';

import { TypeIndicSdlRoutingResolveService } from './type-indic-sdl-routing-resolve.service';

describe('TypeIndicSdlRoutingResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeIndicSdlRoutingResolveService = TestBed.get(TypeIndicSdlRoutingResolveService);
    expect(service).toBeTruthy();
  });
});
