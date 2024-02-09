import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomaineEditComponent } from './domaine-edit.component';

describe('DomaineEditComponent', () => {
  let component: DomaineEditComponent;
  let fixture: ComponentFixture<DomaineEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomaineEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomaineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
