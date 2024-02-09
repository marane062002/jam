import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertsStockComponent } from './transferts-stock.component';

describe('TransfertsStockComponent', () => {
  let component: TransfertsStockComponent;
  let fixture: ComponentFixture<TransfertsStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfertsStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertsStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
