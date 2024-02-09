import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteSanitaireComponent } from './carte-sanitaire.component';

describe('CarteSanitaireComponent', () => {
  let component: CarteSanitaireComponent;
  let fixture: ComponentFixture<CarteSanitaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteSanitaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteSanitaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
