import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardSCComponent } from './dash-board-sc.component';

describe('DashBoardSCComponent', () => {
  let component: DashBoardSCComponent;
  let fixture: ComponentFixture<DashBoardSCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardSCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardSCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
