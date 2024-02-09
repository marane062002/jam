import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimoineIndexComponent } from './patrimoine-index.component';

describe('PatrimoineIndexComponent', () => {
  let component: PatrimoineIndexComponent;
  let fixture: ComponentFixture<PatrimoineIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrimoineIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrimoineIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
