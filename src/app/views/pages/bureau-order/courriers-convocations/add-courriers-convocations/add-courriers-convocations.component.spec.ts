import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourriersConvocationsComponent } from './add-courriers-convocations.component';

describe('AddCourriersConvocationsComponent', () => {
  let component: AddCourriersConvocationsComponent;
  let fixture: ComponentFixture<AddCourriersConvocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourriersConvocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourriersConvocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
