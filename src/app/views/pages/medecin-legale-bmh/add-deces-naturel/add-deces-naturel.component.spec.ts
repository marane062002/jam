import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDecesNaturelComponent } from './add-deces-naturel.component';

describe('AddDecesNaturelComponent', () => {
  let component: AddDecesNaturelComponent;
  let fixture: ComponentFixture<AddDecesNaturelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDecesNaturelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDecesNaturelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
