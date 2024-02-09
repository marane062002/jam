import { TestBed } from '@angular/core/testing';

import { TableauDordService } from './tableau-dord.service';

describe('TableauDordService', () => {
  let service: TableauDordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableauDordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
