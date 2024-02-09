import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAvanceComponent } from './list-avance.component';

describe('ListAvanceComponent', () => {
  let component: ListAvanceComponent;
  let fixture: ComponentFixture<ListAvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
