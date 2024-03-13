import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PourcentageOffreFinanciereComponent } from './pourcentage-offre-financiere.component';

describe('PourcentageOffreFinanciereComponent', () => {
  let component: PourcentageOffreFinanciereComponent;
  let fixture: ComponentFixture<PourcentageOffreFinanciereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PourcentageOffreFinanciereComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PourcentageOffreFinanciereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
