import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAgrementComponent } from './show-agrement.component';

describe('ShowAgrementComponent', () => {
  let component: ShowAgrementComponent;
  let fixture: ComponentFixture<ShowAgrementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAgrementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAgrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
