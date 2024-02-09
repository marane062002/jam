import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubventionsComponent } from './list-subventions.component';

describe('ListSubventionsComponent', () => {
  let component: ListSubventionsComponent;
  let fixture: ComponentFixture<ListSubventionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSubventionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
