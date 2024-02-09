import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramVisitComponent } from './program-visit.component';

describe('ProgramVisitComponent', () => {
  let component: ProgramVisitComponent;
  let fixture: ComponentFixture<ProgramVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
