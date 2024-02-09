import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseShowComponent } from './phase-show.component';

describe('PhaseShowComponent', () => {
  let component: PhaseShowComponent;
  let fixture: ComponentFixture<PhaseShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
