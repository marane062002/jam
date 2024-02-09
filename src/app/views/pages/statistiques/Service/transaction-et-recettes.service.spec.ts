import { TestBed } from '@angular/core/testing';
import { TransactionEtRecettesService } from './transaction-et-recettes.service';



describe('TransactionEtRecettesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionEtRecettesService = TestBed.get(TransactionEtRecettesService);
    expect(service).toBeTruthy();
  });
});
