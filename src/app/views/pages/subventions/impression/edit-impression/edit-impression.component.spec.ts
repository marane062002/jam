import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImpressionComponent } from './edit-impression.component';

describe('EditImpressionComponent', () => {
  let component: EditImpressionComponent;
  let fixture: ComponentFixture<EditImpressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditImpressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
