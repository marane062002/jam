import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceDialogComponent } from './seance-dialog.component';

describe('SeanceDialogComponent', () => {
  let component: SeanceDialogComponent;
  let fixture: ComponentFixture<SeanceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeanceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
