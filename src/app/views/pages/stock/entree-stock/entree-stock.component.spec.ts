import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreeStockComponent } from './entree-stock.component';

describe('EntreeStockComponent', () => {
  let component: EntreeStockComponent;
  let fixture: ComponentFixture<EntreeStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntreeStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntreeStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
