import { TestBed } from '@angular/core/testing';

import { ArticleStockService } from './article-stock.service';

describe('ArticleStockService', () => {
  let service: ArticleStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
