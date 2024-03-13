import { TestBed } from '@angular/core/testing';

import { ConnexionLANService } from './connexion-lan.service';

describe('ConnexionLANService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnexionLANService = TestBed.get(ConnexionLANService);
    expect(service).toBeTruthy();
  });
});
