import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";

import { CotationComponent } from './cotation.component';

describe('CotationComponent', () => {
  let component: CotationComponent;
  let fixture: ComponentFixture<CotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
