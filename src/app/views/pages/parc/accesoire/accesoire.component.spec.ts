import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoireComponent } from './accesoire.component';

describe('AccesoireComponent', () => {
  let component: AccesoireComponent;
  let fixture: ComponentFixture<AccesoireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesoireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
