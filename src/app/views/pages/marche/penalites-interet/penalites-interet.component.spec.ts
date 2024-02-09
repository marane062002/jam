import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenalitesInteretComponent } from './penalites-interet.component';

describe('PenalitesInteretComponent', () => {
  let component: PenalitesInteretComponent;
  let fixture: ComponentFixture<PenalitesInteretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenalitesInteretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenalitesInteretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
