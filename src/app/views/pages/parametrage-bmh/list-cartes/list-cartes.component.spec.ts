import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCartesComponent } from './list-cartes.component';

describe('ListCartesComponent', () => {
  let component: ListCartesComponent;
  let fixture: ComponentFixture<ListCartesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCartesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
