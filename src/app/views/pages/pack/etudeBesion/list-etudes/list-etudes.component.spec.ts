import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEtudesComponent } from './list-etudes.component';

describe('ListEtudesComponent', () => {
  let component: ListEtudesComponent;
  let fixture: ComponentFixture<ListEtudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEtudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEtudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
