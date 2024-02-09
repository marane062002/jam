import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinetgrationStockComponent } from './reinetgration-stock.component';

describe('ReinetgrationStockComponent', () => {
  let component: ReinetgrationStockComponent;
  let fixture: ComponentFixture<ReinetgrationStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReinetgrationStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReinetgrationStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
