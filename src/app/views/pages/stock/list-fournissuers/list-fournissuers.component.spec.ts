import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFournissuersComponent } from './list-fournissuers.component';

describe('ListFournissuersComponent', () => {
  let component: ListFournissuersComponent;
  let fixture: ComponentFixture<ListFournissuersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFournissuersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFournissuersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
