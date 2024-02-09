import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaireIndexComponent } from './beneficiaire-index.component';

describe('BeneficiaireIndexComponent', () => {
  let component: BeneficiaireIndexComponent;
  let fixture: ComponentFixture<BeneficiaireIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiaireIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaireIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
