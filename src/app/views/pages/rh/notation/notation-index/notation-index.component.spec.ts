import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotationIndexComponent } from './notation-index.component';

describe('NotationIndexComponent', () => {
  let component: NotationIndexComponent;
  let fixture: ComponentFixture<NotationIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotationIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
