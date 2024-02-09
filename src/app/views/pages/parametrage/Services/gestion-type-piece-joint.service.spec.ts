import { TestBed } from '@angular/core/testing';

import { GestionTypePieceJointService } from './gestion-type-piece-joint.service';

describe('GestionTypePieceJointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionTypePieceJointService = TestBed.get(GestionTypePieceJointService);
    expect(service).toBeTruthy();
  });
});
