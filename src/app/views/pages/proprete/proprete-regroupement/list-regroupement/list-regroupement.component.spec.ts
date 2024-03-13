import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRegroupementComponent } from './list-regroupement.component';

describe('ListRegroupementComponent', () => {
  let component: ListRegroupementComponent;
  let fixture: ComponentFixture<ListRegroupementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRegroupementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRegroupementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
