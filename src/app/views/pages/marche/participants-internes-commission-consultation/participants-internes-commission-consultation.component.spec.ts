import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsInternesCommissionConsultationComponent } from './participants-internes-commission-consultation.component';

describe('ParticipantsInternesCommissionConsultationComponent', () => {
  let component: ParticipantsInternesCommissionConsultationComponent;
  let fixture: ComponentFixture<ParticipantsInternesCommissionConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantsInternesCommissionConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsInternesCommissionConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
