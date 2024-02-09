import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTransfertComponent } from './list-transfert.component';

describe('ListTransfertComponent', () => {
  let component: ListTransfertComponent;
  let fixture: ComponentFixture<ListTransfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTransfertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
