import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImpressionComponent } from './add-impression.component';

describe('AddImpressionComponent', () => {
  let component: AddImpressionComponent;
  let fixture: ComponentFixture<AddImpressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImpressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
