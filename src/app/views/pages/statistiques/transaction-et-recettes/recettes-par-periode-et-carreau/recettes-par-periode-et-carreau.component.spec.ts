import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecettesParPeriodeEtCarreauComponent } from './recettes-par-periode-et-carreau.component';

describe('RecettesParPeriodeEtCarreauComponent', () => {
  let component: RecettesParPeriodeEtCarreauComponent;
  let fixture: ComponentFixture<RecettesParPeriodeEtCarreauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecettesParPeriodeEtCarreauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecettesParPeriodeEtCarreauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
