import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsertionMediaComponent } from './add-insertion-media.component';

describe('AddInsertionMediaComponent', () => {
  let component: AddInsertionMediaComponent;
  let fixture: ComponentFixture<AddInsertionMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInsertionMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInsertionMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
