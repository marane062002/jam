import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimoineShowComponent } from './patrimoine-show.component';

describe('PatrimoineShowComponent', () => {
  let component: PatrimoineShowComponent;
  let fixture: ComponentFixture<PatrimoineShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrimoineShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrimoineShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
