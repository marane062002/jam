import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomaineIndexComponent } from './domaine-index.component';

describe('DomaineIndexComponent', () => {
  let component: DomaineIndexComponent;
  let fixture: ComponentFixture<DomaineIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomaineIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomaineIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
