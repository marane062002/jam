import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortieStockComponent } from './sortie-stock.component';

describe('SortieStockComponent', () => {
  let component: SortieStockComponent;
  let fixture: ComponentFixture<SortieStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortieStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortieStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
