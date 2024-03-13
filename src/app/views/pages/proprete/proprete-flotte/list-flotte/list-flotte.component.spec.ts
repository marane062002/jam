import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFlotteComponent } from './list-flotte.component';

describe('ListFlotteComponent', () => {
  let component: ListFlotteComponent;
  let fixture: ComponentFixture<ListFlotteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFlotteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFlotteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
