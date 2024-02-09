import { TestBed } from '@angular/core/testing';
import { GestionPeseeService } from './gestion-pesee.service';



describe('GestionPeseeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionPeseeService = TestBed.get(GestionPeseeService);
    expect(service).toBeTruthy();
  });
});
