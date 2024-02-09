import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PjUserIndexComponent } from './pj-user-index.component';

describe('PjUserIndexComponent', () => {
  let component: PjUserIndexComponent;
  let fixture: ComponentFixture<PjUserIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PjUserIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjUserIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
