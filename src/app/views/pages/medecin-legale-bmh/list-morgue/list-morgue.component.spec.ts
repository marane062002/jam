import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMorgueComponent } from './list-morgue.component';

describe('ListMorgueComponent', () => {
  let component: ListMorgueComponent;
  let fixture: ComponentFixture<ListMorgueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMorgueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMorgueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
