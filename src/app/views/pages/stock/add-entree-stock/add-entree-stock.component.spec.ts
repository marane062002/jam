import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntreeStockComponent } from './add-entree-stock.component';

describe('AddEntreeStockComponent', () => {
  let component: AddEntreeStockComponent;
  let fixture: ComponentFixture<AddEntreeStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntreeStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntreeStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
