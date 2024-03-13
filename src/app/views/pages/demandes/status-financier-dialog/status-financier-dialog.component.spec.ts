import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusFinancierDialogComponent } from './status-financier-dialog.component';

describe('StatusFinancierDialogComponent', () => {
  let component: StatusFinancierDialogComponent;
  let fixture: ComponentFixture<StatusFinancierDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusFinancierDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusFinancierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
