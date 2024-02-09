import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCourriersConvocationsComponent } from './show-courriers-convocations.component';

describe('ShowCourriersConvocationsComponent', () => {
  let component: ShowCourriersConvocationsComponent;
  let fixture: ComponentFixture<ShowCourriersConvocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCourriersConvocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCourriersConvocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
