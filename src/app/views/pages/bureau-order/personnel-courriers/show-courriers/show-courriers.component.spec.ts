import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCourriersComponent } from './show-courriers.component';

describe('ShowCourriersComponent', () => {
  let component: ShowCourriersComponent;
  let fixture: ComponentFixture<ShowCourriersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCourriersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCourriersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
