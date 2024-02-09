import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvmtransactionEditComponent } from './mvmtransaction-edit.component';

describe('MvmtransactionEditComponent', () => {
  let component: MvmtransactionEditComponent;
  let fixture: ComponentFixture<MvmtransactionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvmtransactionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvmtransactionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
