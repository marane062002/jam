import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsInternesCommissionTechniqueAoDetailComponent } from './participants-internes-commission-technique-ao-detail.component';

describe('ParticipantsInternesCommissionTechniqueAoDetailComponent', () => {
  let component: ParticipantsInternesCommissionTechniqueAoDetailComponent;
  let fixture: ComponentFixture<ParticipantsInternesCommissionTechniqueAoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantsInternesCommissionTechniqueAoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsInternesCommissionTechniqueAoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
