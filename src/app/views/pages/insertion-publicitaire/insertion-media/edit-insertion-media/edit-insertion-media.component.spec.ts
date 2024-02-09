import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsertionMediaComponent } from './edit-insertion-media.component';

describe('EditInsertionMediaComponent', () => {
  let component: EditInsertionMediaComponent;
  let fixture: ComponentFixture<EditInsertionMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInsertionMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInsertionMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
