import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCadavreComponent } from './list-cadavre.component';

describe('ListCadavreComponent', () => {
  let component: ListCadavreComponent;
  let fixture: ComponentFixture<ListCadavreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCadavreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCadavreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
