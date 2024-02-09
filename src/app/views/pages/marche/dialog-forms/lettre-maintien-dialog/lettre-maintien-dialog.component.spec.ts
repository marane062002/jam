import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LettreMaintienDialogComponent } from './lettre-maintien-dialog.component';

describe('LettreMaintienDialogComponent', () => {
  let component: LettreMaintienDialogComponent;
  let fixture: ComponentFixture<LettreMaintienDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LettreMaintienDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LettreMaintienDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
