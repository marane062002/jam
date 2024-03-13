import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgrammePrevisionnelComponent } from './edit-programme-previsionnel.component';

describe('EditProgrammePrevisionnelComponent', () => {
  let component: EditProgrammePrevisionnelComponent;
  let fixture: ComponentFixture<EditProgrammePrevisionnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProgrammePrevisionnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProgrammePrevisionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
