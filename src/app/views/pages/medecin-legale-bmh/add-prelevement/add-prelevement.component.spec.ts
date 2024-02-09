import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrelevementComponent } from './add-prelevement.component';

describe('AddPrelevementComponent', () => {
  let component: AddPrelevementComponent;
  let fixture: ComponentFixture<AddPrelevementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPrelevementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrelevementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
