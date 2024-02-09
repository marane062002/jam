import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomaineShowComponent } from './domaine-show.component';

describe('DomaineShowComponent', () => {
  let component: DomaineShowComponent;
  let fixture: ComponentFixture<DomaineShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomaineShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomaineShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
