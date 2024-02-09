/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MiseEnDemeureResiliationComponent } from './mise-en-demeure-resiliation.component';

describe('MiseEnDemeureResiliationComponent', () => {
  let component: MiseEnDemeureResiliationComponent;
  let fixture: ComponentFixture<MiseEnDemeureResiliationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiseEnDemeureResiliationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiseEnDemeureResiliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
