import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroplanningProgrammeComponent } from './retroplanning-programme.component';

describe('RetroplanningProgrammeComponent', () => {
  let component: RetroplanningProgrammeComponent;
  let fixture: ComponentFixture<RetroplanningProgrammeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [   RetroplanningProgrammeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetroplanningProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
