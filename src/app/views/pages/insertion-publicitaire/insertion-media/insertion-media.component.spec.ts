import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionMediaComponent } from './insertion-media.component';

describe('InsertionMediaComponent', () => {
  let component: InsertionMediaComponent;
  let fixture: ComponentFixture<InsertionMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertionMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertionMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
