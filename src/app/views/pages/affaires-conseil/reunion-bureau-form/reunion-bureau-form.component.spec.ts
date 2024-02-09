import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionBureauFormComponent } from './reunion-bureau-form.component';

describe('ReunionBureauFormComponent', () => {
  let component: ReunionBureauFormComponent;
  let fixture: ComponentFixture<ReunionBureauFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReunionBureauFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionBureauFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
