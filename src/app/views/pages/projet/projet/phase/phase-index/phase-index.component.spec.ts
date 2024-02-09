import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseIndexComponent } from './phase-index.component';

describe('PhaseIndexComponent', () => {
  let component: PhaseIndexComponent;
  let fixture: ComponentFixture<PhaseIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
