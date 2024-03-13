import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropreteCircuitComponent } from './proprete-circuit.component';

describe('PropreteCircuitComponent', () => {
  let component: PropreteCircuitComponent;
  let fixture: ComponentFixture<PropreteCircuitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropreteCircuitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropreteCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
