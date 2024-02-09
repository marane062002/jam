import { TestBed } from '@angular/core/testing';

import { FonctionnaireService } from './fonctionnaire.service';

describe('FonctionnaireService', () => {
  let service: FonctionnaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FonctionnaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
