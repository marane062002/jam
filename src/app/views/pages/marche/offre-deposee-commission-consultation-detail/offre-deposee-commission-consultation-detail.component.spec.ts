import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreDeposeeCommissionConsultationDetailComponent } from './offre-deposee-commission-consultation-detail.component';

describe('OffreDeposeeCommissionConsultationDetailComponent', () => {
  let component: OffreDeposeeCommissionConsultationDetailComponent;
  let fixture: ComponentFixture<OffreDeposeeCommissionConsultationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffreDeposeeCommissionConsultationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffreDeposeeCommissionConsultationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
