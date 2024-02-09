import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReformeComponent } from './list-reforme.component';

describe('ListReformeComponent', () => {
  let component: ListReformeComponent;
  let fixture: ComponentFixture<ListReformeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReformeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
