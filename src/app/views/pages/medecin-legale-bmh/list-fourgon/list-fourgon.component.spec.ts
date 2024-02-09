import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFourgonComponent } from './list-fourgon.component';

describe('ListFourgonComponent', () => {
  let component: ListFourgonComponent;
  let fixture: ComponentFixture<ListFourgonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFourgonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFourgonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
