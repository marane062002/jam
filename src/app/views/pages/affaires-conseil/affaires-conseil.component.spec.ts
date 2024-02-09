import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffairesConseilComponent } from './affaires-conseil.component';

describe('AffairesConseilComponent', () => {
  let component: AffairesConseilComponent;
  let fixture: ComponentFixture<AffairesConseilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffairesConseilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffairesConseilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
