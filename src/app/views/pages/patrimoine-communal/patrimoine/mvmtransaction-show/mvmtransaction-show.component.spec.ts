import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvmtransactionShowComponent } from './mvmtransaction-show.component';

describe('MvmtransactionShowComponent', () => {
  let component: MvmtransactionShowComponent;
  let fixture: ComponentFixture<MvmtransactionShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvmtransactionShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvmtransactionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
