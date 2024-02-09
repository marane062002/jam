import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferomeStockComponent } from './referome-stock.component';

describe('ReferomeStockComponent', () => {
  let component: ReferomeStockComponent;
  let fixture: ComponentFixture<ReferomeStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferomeStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferomeStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
