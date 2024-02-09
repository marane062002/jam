import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitationEditComponent } from './habitation-edit.component';

describe('HabitationEditComponent', () => {
  let component: HabitationEditComponent;
  let fixture: ComponentFixture<HabitationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
