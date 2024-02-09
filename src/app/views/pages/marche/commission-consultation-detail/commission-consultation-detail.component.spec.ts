import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionConsultationDetailComponent } from './commission-consultation-detail.component';

describe('CommissionConsultationDetailComponent', () => {
  let component: CommissionConsultationDetailComponent;
  let fixture: ComponentFixture<CommissionConsultationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionConsultationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionConsultationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
