
import { TestBed } from '@angular/core/testing';

import { ListTypeAnalyseService } from './list-type-analyse.service';

describe('ListTypeAnalyseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListTypeAnalyseService = TestBed.get(ListTypeAnalyseService);
    expect(service).toBeTruthy();
  });
});
