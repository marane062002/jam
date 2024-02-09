import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSousTypeComponent } from './list-sous-type.component';

describe('ListSousTypeComponent', () => {
  let component: ListSousTypeComponent;
  let fixture: ComponentFixture<ListSousTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSousTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSousTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
