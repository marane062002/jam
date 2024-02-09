import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAutopsieComponent } from './add-autopsie.component';

describe('AddAutopsieComponent', () => {
  let component: AddAutopsieComponent;
  let fixture: ComponentFixture<AddAutopsieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAutopsieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAutopsieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
