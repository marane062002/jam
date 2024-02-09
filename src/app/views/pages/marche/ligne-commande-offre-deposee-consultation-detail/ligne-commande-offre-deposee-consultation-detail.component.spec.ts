import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneCommandeOffreDeposeeConsultationDetailComponent } from './ligne-commande-offre-deposee-consultation-detail.component';

describe('LigneCommandeOffreDeposeeConsultationDetailComponent', () => {
  let component: LigneCommandeOffreDeposeeConsultationDetailComponent;
  let fixture: ComponentFixture<LigneCommandeOffreDeposeeConsultationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigneCommandeOffreDeposeeConsultationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneCommandeOffreDeposeeConsultationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
