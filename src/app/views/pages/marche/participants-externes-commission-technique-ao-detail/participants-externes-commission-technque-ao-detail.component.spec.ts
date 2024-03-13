import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsExternesCommissionTechniqueAoDetailComponent } from './participants-externes-commissiontechnique-ao-detail.component';

describe('ParticipantsExternesCommissionTechniqueAoDetailComponent', () => {
  let component: ParticipantsExternesCommissionTechniqueAoDetailComponent;
  let fixture: ComponentFixture<ParticipantsExternesCommissionTechniqueAoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantsExternesCommissionTechniqueAoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsExternesCommissionTechniqueAoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
