import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AoValidationDialogComponent } from './ao-validation-dialog.component';

describe('AoValidationDialogComponent', () => {
  let component: AoValidationDialogComponent;
  let fixture: ComponentFixture<AoValidationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AoValidationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AoValidationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
