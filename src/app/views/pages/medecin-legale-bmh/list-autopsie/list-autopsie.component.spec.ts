import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAutopsieComponent } from './list-autopsie.component';

describe('ListAutopsieComponent', () => {
  let component: ListAutopsieComponent;
  let fixture: ComponentFixture<ListAutopsieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAutopsieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAutopsieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
