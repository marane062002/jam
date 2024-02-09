import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInsertionMediaComponent } from './show-insertion-media.component';

describe('ShowInsertionMediaComponent', () => {
  let component: ShowInsertionMediaComponent;
  let fixture: ComponentFixture<ShowInsertionMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowInsertionMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInsertionMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
