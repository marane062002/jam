import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationPointComponent } from './affectation-point.component';

describe('AffectationPointComponent', () => {
  let component: AffectationPointComponent;
  let fixture: ComponentFixture<AffectationPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectationPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
