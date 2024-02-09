import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsExternesCommissionAoDetailComponent } from './participants-externes-commission-ao-detail.component';

describe('ParticipantsExternesCommissionAoDetailComponent', () => {
  let component: ParticipantsExternesCommissionAoDetailComponent;
  let fixture: ComponentFixture<ParticipantsExternesCommissionAoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantsExternesCommissionAoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsExternesCommissionAoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
