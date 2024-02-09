import { TestBed } from '@angular/core/testing';
import { GestionPartsService } from './gestion-des-parts.service';




describe('GestionPartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionPartsService = TestBed.get(GestionPartsService);
    expect(service).toBeTruthy();
  });
});
