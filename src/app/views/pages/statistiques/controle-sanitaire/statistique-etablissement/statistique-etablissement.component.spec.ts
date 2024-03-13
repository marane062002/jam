import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueEtablissementComponent } from './statistique-etablissement.component';

describe('StatistiqueEtablissementComponent', () => {
  let component: StatistiqueEtablissementComponent;
  let fixture: ComponentFixture<StatistiqueEtablissementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatistiqueEtablissementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistiqueEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
