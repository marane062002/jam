import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationArchitecturaleListComponent } from './consultation-architecturale-list.component';

describe('ConsultationArchitecturaleListComponent', () => {
  let component: ConsultationArchitecturaleListComponent;
  let fixture: ComponentFixture<ConsultationArchitecturaleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationArchitecturaleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationArchitecturaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
