import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaCommissionComponent } from './ca-commission.component';

describe('CaCommissionComponent', () => {
  let component: CaCommissionComponent;
  let fixture: ComponentFixture<CaCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
