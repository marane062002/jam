import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiDgConsultationComponent } from './vali-dg-consultation.component';

describe('ValiDgConsultationComponent', () => {
  let component: ValiDgConsultationComponent;
  let fixture: ComponentFixture<ValiDgConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValiDgConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiDgConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
