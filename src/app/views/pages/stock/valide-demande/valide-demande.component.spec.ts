import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValideDemandeComponent } from './valide-demande.component';

describe('ValideDemandeComponent', () => {
  let component: ValideDemandeComponent;
  let fixture: ComponentFixture<ValideDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValideDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValideDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
