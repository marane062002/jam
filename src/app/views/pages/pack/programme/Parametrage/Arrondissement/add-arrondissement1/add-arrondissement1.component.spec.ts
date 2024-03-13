import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArrondissement1Component } from './add-arrondissement1.component';

describe('AddArrondissement1Component', () => {
  let component: AddArrondissement1Component;
  let fixture: ComponentFixture<AddArrondissement1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArrondissement1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArrondissement1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
