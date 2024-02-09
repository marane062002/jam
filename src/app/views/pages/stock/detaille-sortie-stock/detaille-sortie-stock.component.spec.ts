import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleSortieStockComponent } from './detaille-sortie-stock.component';

describe('DetailleSortieStockComponent', () => {
  let component: DetailleSortieStockComponent;
  let fixture: ComponentFixture<DetailleSortieStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailleSortieStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleSortieStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
