import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowConventionComponent } from './show-convention.component';

describe('ShowConventionComponent', () => {
  let component: ShowConventionComponent;
  let fixture: ComponentFixture<ShowConventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowConventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
