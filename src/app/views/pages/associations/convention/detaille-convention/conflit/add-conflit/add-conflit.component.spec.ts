import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConflitComponent } from './add-conflit.component';

describe('AddConflitComponent', () => {
  let component: AddConflitComponent;
  let fixture: ComponentFixture<AddConflitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConflitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConflitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
