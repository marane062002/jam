import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccesoireComponent } from './add-accesoire.component';

describe('AddAccesoireComponent', () => {
  let component: AddAccesoireComponent;
  let fixture: ComponentFixture<AddAccesoireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccesoireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccesoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
