import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegataireComponent } from './delegataire.component';

describe('DelegataireComponent', () => {
  let component: DelegataireComponent;
  let fixture: ComponentFixture<DelegataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelegataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
