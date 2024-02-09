import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgrementComponent } from './add-agrement.component';

describe('AddAgrementComponent', () => {
  let component: AddAgrementComponent;
  let fixture: ComponentFixture<AddAgrementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAgrementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAgrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
