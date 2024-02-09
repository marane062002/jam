import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuantiteParTypeEtPeriodeModalComponent } from './quantite-par-type-et-periode-modal.component';


describe('QuantiteParTypeEtPeriodeModalComponent', () => {
  let component: QuantiteParTypeEtPeriodeModalComponent;
  let fixture: ComponentFixture<QuantiteParTypeEtPeriodeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantiteParTypeEtPeriodeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantiteParTypeEtPeriodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
