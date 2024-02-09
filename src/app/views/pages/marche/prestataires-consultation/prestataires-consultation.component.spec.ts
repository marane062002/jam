import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestatairesConsultationComponent } from './prestataires-consultation.component';

describe('PrestatairesConsultationComponent', () => {
  let component: PrestatairesConsultationComponent;
  let fixture: ComponentFixture<PrestatairesConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestatairesConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestatairesConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
