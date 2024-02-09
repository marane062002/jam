import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVignetteComponent } from './show-vignette.component';

describe('ShowVignetteComponent', () => {
  let component: ShowVignetteComponent;
  let fixture: ComponentFixture<ShowVignetteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowVignetteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVignetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
