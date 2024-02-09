import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitationShowComponent } from './habitation-show.component';

describe('HabitationShowComponent', () => {
  let component: HabitationShowComponent;
  let fixture: ComponentFixture<HabitationShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitationShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
