import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauBordDialogComponent } from './tableau-bord-dialog.component';

describe('TableauBordDialogComponent', () => {
  let component: TableauBordDialogComponent;
  let fixture: ComponentFixture<TableauBordDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauBordDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauBordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
