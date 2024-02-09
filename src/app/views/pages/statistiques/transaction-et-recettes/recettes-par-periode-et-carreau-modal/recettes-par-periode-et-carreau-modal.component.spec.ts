import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecettesParPeriodeEtCarreauModalComponent } from './recettes-par-periode-et-carreau-modal.component';

describe('RecettesParPeriodeEtCarreauModalComponent', () => {
  let component: RecettesParPeriodeEtCarreauModalComponent;
  let fixture: ComponentFixture<RecettesParPeriodeEtCarreauModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecettesParPeriodeEtCarreauModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecettesParPeriodeEtCarreauModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
