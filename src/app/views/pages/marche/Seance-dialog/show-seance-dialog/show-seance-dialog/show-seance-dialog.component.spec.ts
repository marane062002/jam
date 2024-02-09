import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSeanceDialogComponent } from './show-seance-dialog.component';

describe('ShowSeanceDialogComponent', () => {
  let component: ShowSeanceDialogComponent;
  let fixture: ComponentFixture<ShowSeanceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSeanceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSeanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
