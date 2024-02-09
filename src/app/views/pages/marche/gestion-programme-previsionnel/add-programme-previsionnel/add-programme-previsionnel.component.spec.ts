import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgrammePrevisionnelComponent } from './add-programme-previsionnel.component';

describe('AddProgrammePrevisionnelComponent', () => {
  let component: AddProgrammePrevisionnelComponent;
  let fixture: ComponentFixture<AddProgrammePrevisionnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProgrammePrevisionnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgrammePrevisionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
