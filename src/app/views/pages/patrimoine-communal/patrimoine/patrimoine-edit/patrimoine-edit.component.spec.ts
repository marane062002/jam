import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimoineEditComponent } from './patrimoine-edit.component';

describe('PatrimoineEditComponent', () => {
  let component: PatrimoineEditComponent;
  let fixture: ComponentFixture<PatrimoineEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrimoineEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrimoineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
