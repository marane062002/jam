import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowActivitesComponent } from './show-activites.component';

describe('ShowActivitesComponent', () => {
  let component: ShowActivitesComponent;
  let fixture: ComponentFixture<ShowActivitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowActivitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowActivitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
