import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDemandeComponent } from './modifier-demande.component';

describe('ModifierDemandeComponent', () => {
  let component: ModifierDemandeComponent;
  let fixture: ComponentFixture<ModifierDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierDemandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
