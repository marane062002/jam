import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseProgrammeComponent } from './phase-programme.component';

describe('PhaseProgrammeComponent', () => {
  let component: PhaseProgrammeComponent;
  let fixture: ComponentFixture<PhaseProgrammeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseProgrammeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
