import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgrammeRetroplanningComponent } from './add-programme-retroplanning.component';

describe('AddProgrammeRetroplanningComponent', () => {
  let component: AddProgrammeRetroplanningComponent;
  let fixture: ComponentFixture<AddProgrammeRetroplanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProgrammeRetroplanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgrammeRetroplanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
