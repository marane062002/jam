import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeImpressionComponent } from './edit-type-impression.component';

describe('EditTypeImpressionComponent', () => {
  let component: EditTypeImpressionComponent;
  let fixture: ComponentFixture<EditTypeImpressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTypeImpressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTypeImpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
