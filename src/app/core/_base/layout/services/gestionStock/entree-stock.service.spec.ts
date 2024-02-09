import { TestBed } from '@angular/core/testing';

import { EntreeStockService } from './entree-stock.service';

describe('EntreeStockService', () => {
  let service: EntreeStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntreeStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
