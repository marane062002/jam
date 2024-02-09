import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsInternesCommissionAoDetailComponent } from './participants-internes-commission-ao-detail.component';

describe('ParticipantsInternesCommissionAoDetailComponent', () => {
  let component: ParticipantsInternesCommissionAoDetailComponent;
  let fixture: ComponentFixture<ParticipantsInternesCommissionAoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantsInternesCommissionAoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsInternesCommissionAoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
