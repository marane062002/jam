import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationArchitecturaleFormComponent } from './consultation-architecturale-form.component';

describe('ConsultationArchitecturaleFormComponent', () => {
  let component: ConsultationArchitecturaleFormComponent;
  let fixture: ComponentFixture<ConsultationArchitecturaleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationArchitecturaleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationArchitecturaleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
