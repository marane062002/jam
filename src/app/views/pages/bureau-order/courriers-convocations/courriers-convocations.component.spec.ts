import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourriersConvocationsComponent } from './courriers-convocations.component';

describe('CourriersConvocationsComponent', () => {
  let component: CourriersConvocationsComponent;
  let fixture: ComponentFixture<CourriersConvocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourriersConvocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourriersConvocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
