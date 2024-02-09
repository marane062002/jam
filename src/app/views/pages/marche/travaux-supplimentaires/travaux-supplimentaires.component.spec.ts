/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TravauxSupplimentairesComponent } from './travaux-supplimentaires.component';

describe('TravauxSupplimentairesComponent', () => {
  let component: TravauxSupplimentairesComponent;
  let fixture: ComponentFixture<TravauxSupplimentairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravauxSupplimentairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravauxSupplimentairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
