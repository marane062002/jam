import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LignCommandeConsultationComponent } from './lign-commande-consultation.component';

describe('LignCommandeConsultationComponent', () => {
  let component: LignCommandeConsultationComponent;
  let fixture: ComponentFixture<LignCommandeConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LignCommandeConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LignCommandeConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
