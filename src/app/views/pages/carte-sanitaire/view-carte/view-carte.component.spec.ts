import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCarteComponent } from './view-carte.component';

describe('ViewCarteComponent', () => {
  let component: ViewCarteComponent;
  let fixture: ComponentFixture<ViewCarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCarteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
