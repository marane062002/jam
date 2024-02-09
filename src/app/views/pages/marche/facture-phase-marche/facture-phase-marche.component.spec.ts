import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturePhaseMarcheComponent } from './facture-phase-marche.component';

describe('FacturePhaseMarcheComponent', () => {
  let component: FacturePhaseMarcheComponent;
  let fixture: ComponentFixture<FacturePhaseMarcheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturePhaseMarcheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturePhaseMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
