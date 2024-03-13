import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArrondissementComponent } from './list-arrondissement.component';

describe('ListArrondissementComponent', () => {
  let component: ListArrondissementComponent;
  let fixture: ComponentFixture<ListArrondissementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListArrondissementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArrondissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
