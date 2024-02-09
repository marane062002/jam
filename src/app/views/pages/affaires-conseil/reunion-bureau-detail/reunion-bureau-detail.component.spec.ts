import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionBureauDetailComponent } from './reunion-bureau-detail.component';

describe('ReunionBureauDetailComponent', () => {
  let component: ReunionBureauDetailComponent;
  let fixture: ComponentFixture<ReunionBureauDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReunionBureauDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionBureauDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
