import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrigineComponent } from './list-origine.component';

describe('ListOrigineComponent', () => {
  let component: ListOrigineComponent;
  let fixture: ComponentFixture<ListOrigineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrigineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrigineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
