import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitationNewComponent } from './habitation-new.component';

describe('HabitationNewComponent', () => {
  let component: HabitationNewComponent;
  let fixture: ComponentFixture<HabitationNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitationNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
