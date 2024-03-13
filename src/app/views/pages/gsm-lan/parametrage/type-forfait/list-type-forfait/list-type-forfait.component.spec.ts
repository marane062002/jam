import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeForfaitComponent } from './list-type-forfait.component';

describe('ListTypeForfaitComponent', () => {
  let component: ListTypeForfaitComponent;
  let fixture: ComponentFixture<ListTypeForfaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypeForfaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeForfaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
