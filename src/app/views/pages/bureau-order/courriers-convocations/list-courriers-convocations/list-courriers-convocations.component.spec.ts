import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCourriersConvocationsComponent } from './list-courriers-convocations.component';

describe('ListCourriersConvocationsComponent', () => {
  let component: ListCourriersConvocationsComponent;
  let fixture: ComponentFixture<ListCourriersConvocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCourriersConvocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCourriersConvocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
