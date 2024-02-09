import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeImpressionComponent } from './add-type-impression.component';

describe('AddTypeImpressionComponent', () => {
  let component: AddTypeImpressionComponent;
  let fixture: ComponentFixture<AddTypeImpressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeImpressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeImpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
