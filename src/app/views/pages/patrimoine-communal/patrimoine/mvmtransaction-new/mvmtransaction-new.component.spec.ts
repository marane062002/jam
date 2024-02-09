import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvmtransactionNewComponent } from './mvmtransaction-new.component';

describe('MvmtransactionNewComponent', () => {
  let component: MvmtransactionNewComponent;
  let fixture: ComponentFixture<MvmtransactionNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvmtransactionNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvmtransactionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
