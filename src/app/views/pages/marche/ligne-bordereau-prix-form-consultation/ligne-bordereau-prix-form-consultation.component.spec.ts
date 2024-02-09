import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneBordereauPrixFormConsultationComponent } from './ligne-bordereau-prix-form-consultation.component';

describe('LigneBordereauPrixFormConsultationComponent', () => {
  let component: LigneBordereauPrixFormConsultationComponent;
  let fixture: ComponentFixture<LigneBordereauPrixFormConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigneBordereauPrixFormConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneBordereauPrixFormConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
