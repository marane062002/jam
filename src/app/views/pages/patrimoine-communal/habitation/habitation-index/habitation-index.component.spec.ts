import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitationIndexComponent } from './habitation-index.component';

describe('HabitationIndexComponent', () => {
  let component: HabitationIndexComponent;
  let fixture: ComponentFixture<HabitationIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitationIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
