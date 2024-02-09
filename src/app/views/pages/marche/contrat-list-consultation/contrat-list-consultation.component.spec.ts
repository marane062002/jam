import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratListConsultationComponent } from './contrat-list-consultation.component';

describe('ContratListConsultationComponent', () => {
  let component: ContratListConsultationComponent;
  let fixture: ComponentFixture<ContratListConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratListConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratListConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
