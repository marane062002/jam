import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationArchitecturaleEditComponent } from './consultation-architecturale-edit.component';

describe('ConsultationArchitecturaleEditComponent', () => {
  let component: ConsultationArchitecturaleEditComponent;
  let fixture: ComponentFixture<ConsultationArchitecturaleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationArchitecturaleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationArchitecturaleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
