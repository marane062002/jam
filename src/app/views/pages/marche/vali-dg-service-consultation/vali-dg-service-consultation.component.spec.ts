import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiDgServiceConsultationComponent } from './vali-dg-service-consultation.component';

describe('ValiDgServiceConsultationComponent', () => {
  let component: ValiDgServiceConsultationComponent;
  let fixture: ComponentFixture<ValiDgServiceConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValiDgServiceConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiDgServiceConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
