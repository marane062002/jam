import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTarifsComponent } from './list-tarifs.component';

describe('ListTarifsComponent', () => {
  let component: ListTarifsComponent;
  let fixture: ComponentFixture<ListTarifsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTarifsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTarifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
