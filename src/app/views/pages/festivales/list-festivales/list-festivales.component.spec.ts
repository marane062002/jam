import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFestivalesComponent } from './list-festivales.component';

describe('ListFestivalesComponent', () => {
  let component: ListFestivalesComponent;
  let fixture: ComponentFixture<ListFestivalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFestivalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFestivalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
