import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeAoComponent } from './list-type-ao.component';

describe('ListTypeAoComponent', () => {
  let component: ListTypeAoComponent;
  let fixture: ComponentFixture<ListTypeAoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypeAoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeAoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
