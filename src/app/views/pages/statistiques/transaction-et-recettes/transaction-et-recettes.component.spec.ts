import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionEtRecettesComponent } from './transaction-et-recettes.component';



describe('TransactionEtRecettesComponent', () => {
  let component: TransactionEtRecettesComponent;
  let fixture: ComponentFixture<TransactionEtRecettesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionEtRecettesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionEtRecettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
