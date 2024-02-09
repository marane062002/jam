import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuantiteParTypeEtPeriodeComponent } from './quantite-par-type-et-periode.component';


describe('QuantiteParTypeEtPeriodeComponent', () => {
  let component: QuantiteParTypeEtPeriodeComponent;
  let fixture: ComponentFixture<QuantiteParTypeEtPeriodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantiteParTypeEtPeriodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantiteParTypeEtPeriodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
