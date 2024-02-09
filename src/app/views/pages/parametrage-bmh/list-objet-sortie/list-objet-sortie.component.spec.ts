import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListObjetSortieComponent } from './list-objet-sortie.component';

describe('ListObjetSortieComponent', () => {
  let component: ListObjetSortieComponent;
  let fixture: ComponentFixture<ListObjetSortieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListObjetSortieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListObjetSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
