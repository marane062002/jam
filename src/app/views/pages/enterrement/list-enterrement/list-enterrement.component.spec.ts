import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnterrementComponent } from './list-enterrement.component';

describe('ListEnterrementComponent', () => {
  let component: ListEnterrementComponent;
  let fixture: ComponentFixture<ListEnterrementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEnterrementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEnterrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
