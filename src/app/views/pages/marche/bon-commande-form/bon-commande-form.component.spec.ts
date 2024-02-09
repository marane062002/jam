import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonCommandeFormComponent } from './bon-commande-form.component';

describe('BonCommandeFormComponent', () => {
  let component: BonCommandeFormComponent;
  let fixture: ComponentFixture<BonCommandeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonCommandeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonCommandeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
