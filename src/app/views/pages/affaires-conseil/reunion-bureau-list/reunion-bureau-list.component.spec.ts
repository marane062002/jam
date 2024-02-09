import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionBureauListComponent } from './reunion-bureau-list.component';

describe('ReunionBureauListComponent', () => {
  let component: ReunionBureauListComponent;
  let fixture: ComponentFixture<ReunionBureauListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReunionBureauListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionBureauListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
