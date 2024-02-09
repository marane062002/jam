import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeExamenComponent } from './list-type-examen.component';

describe('ListTypeExamenComponent', () => {
  let component: ListTypeExamenComponent;
  let fixture: ComponentFixture<ListTypeExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypeExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
