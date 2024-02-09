import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCourriersRefusesComponent } from './show-courriers-refuses.component';

describe('ShowCourriersRefusesComponent', () => {
  let component: ShowCourriersRefusesComponent;
  let fixture: ComponentFixture<ShowCourriersRefusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCourriersRefusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCourriersRefusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
