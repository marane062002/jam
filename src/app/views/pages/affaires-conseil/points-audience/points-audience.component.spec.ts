import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsAudienceComponent } from './points-audience.component';

describe('PointsAudienceComponent', () => {
  let component: PointsAudienceComponent;
  let fixture: ComponentFixture<PointsAudienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsAudienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
