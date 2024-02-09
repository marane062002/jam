import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonneMoraleComponent } from './add-personne-morale.component';

describe('AddPersonneMoraleComponent', () => {
  let component: AddPersonneMoraleComponent;
  let fixture: ComponentFixture<AddPersonneMoraleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPersonneMoraleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersonneMoraleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
