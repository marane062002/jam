import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AoConsultationDetailComponent } from './ao-consultation-detail.component';

describe('AoConsultationDetailComponent', () => {
  let component: AoConsultationDetailComponent;
  let fixture: ComponentFixture<AoConsultationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AoConsultationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AoConsultationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
