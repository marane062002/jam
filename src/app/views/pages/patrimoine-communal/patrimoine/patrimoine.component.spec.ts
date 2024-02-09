import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimoineComponent } from './patrimoine.component';

describe('PatrimoineComponent', () => {
  let component: PatrimoineComponent;
  let fixture: ComponentFixture<PatrimoineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrimoineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrimoineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
