import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMvmtransactionComponent } from './tab-mvmtransaction.component';

describe('TabMvmtransactionComponent', () => {
  let component: TabMvmtransactionComponent;
  let fixture: ComponentFixture<TabMvmtransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabMvmtransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabMvmtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
