import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceResultatDefComponent } from './seance-resultat-def.component';

describe('SeanceResultatDefComponent', () => {
  let component: SeanceResultatDefComponent;
  let fixture: ComponentFixture<SeanceResultatDefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeanceResultatDefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeanceResultatDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
