import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInsertionMediaComponent } from './list-insertion-media.component';

describe('ListInsertionMediaComponent', () => {
  let component: ListInsertionMediaComponent;
  let fixture: ComponentFixture<ListInsertionMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInsertionMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInsertionMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
