import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointDetailComponent } from './point-detail.component';

describe('PointDetailComponent', () => {
  let component: PointDetailComponent;
  let fixture: ComponentFixture<PointDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
