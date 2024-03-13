import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropreteReclamationsPenalitesComponent } from './proprete-reclamations-penalites.component';

describe('PropreteReclamationsPenalitesComponent', () => {
  let component: PropreteReclamationsPenalitesComponent;
  let fixture: ComponentFixture<PropreteReclamationsPenalitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropreteReclamationsPenalitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropreteReclamationsPenalitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
