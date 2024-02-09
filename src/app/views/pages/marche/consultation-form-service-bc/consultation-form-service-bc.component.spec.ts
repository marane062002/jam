import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationFormServiceBCComponent } from './consultation-form-service-bc.component';

describe('ConsultationFormServiceBCComponent', () => {
  let component: ConsultationFormServiceBCComponent;
  let fixture: ComponentFixture<ConsultationFormServiceBCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationFormServiceBCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationFormServiceBCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
