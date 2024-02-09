import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaireShowComponent } from './beneficiaire-show.component';

describe('BeneficiaireShowComponent', () => {
  let component: BeneficiaireShowComponent;
  let fixture: ComponentFixture<BeneficiaireShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiaireShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaireShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
