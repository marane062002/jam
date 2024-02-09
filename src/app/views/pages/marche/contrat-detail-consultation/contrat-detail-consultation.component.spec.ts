import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratDetailConsultationComponent } from './contrat-detail-consultation.component';

describe('ContratDetailConsultationComponent', () => {
  let component: ContratDetailConsultationComponent;
  let fixture: ComponentFixture<ContratDetailConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratDetailConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratDetailConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
