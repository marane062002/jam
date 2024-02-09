import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSortieComponent } from './list-sortie.component';

describe('ListSortieComponent', () => {
  let component: ListSortieComponent;
  let fixture: ComponentFixture<ListSortieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSortieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
