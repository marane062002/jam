import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConstateurComponent } from './list-constateur.component';

describe('ListConstateurComponent', () => {
  let component: ListConstateurComponent;
  let fixture: ComponentFixture<ListConstateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConstateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConstateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
