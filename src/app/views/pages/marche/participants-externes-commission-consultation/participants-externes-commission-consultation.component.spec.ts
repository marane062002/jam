import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsExternesCommissionConsultationComponent } from './participants-externes-commission-consultation.component';

describe('ParticipantsExternesCommissionConsultationComponent', () => {
  let component: ParticipantsExternesCommissionConsultationComponent;
  let fixture: ComponentFixture<ParticipantsExternesCommissionConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantsExternesCommissionConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsExternesCommissionConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
