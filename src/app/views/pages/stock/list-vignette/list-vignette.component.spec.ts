import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVignetteComponent } from './list-vignette.component';

describe('ListVignetteComponent', () => {
  let component: ListVignetteComponent;
  let fixture: ComponentFixture<ListVignetteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVignetteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVignetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
