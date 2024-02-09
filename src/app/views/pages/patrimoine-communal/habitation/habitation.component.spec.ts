import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitationComponent } from './habitation.component';

describe('HabitationComponent', () => {
  let component: HabitationComponent;
  let fixture: ComponentFixture<HabitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
