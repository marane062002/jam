import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourriersConvocationsComponent } from './edit-courriers-convocations.component';

describe('EditCourriersConvocationsComponent', () => {
  let component: EditCourriersConvocationsComponent;
  let fixture: ComponentFixture<EditCourriersConvocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCourriersConvocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourriersConvocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
