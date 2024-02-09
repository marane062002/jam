import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionConsultationComponent } from './commission-consultation.component';

describe('CommissionConsultationComponent', () => {
  let component: CommissionConsultationComponent;
  let fixture: ComponentFixture<CommissionConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
