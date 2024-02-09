import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeMarcheComponent } from './list-type-marche.component';

describe('ListTypeMarcheComponent', () => {
  let component: ListTypeMarcheComponent;
  let fixture: ComponentFixture<ListTypeMarcheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypeMarcheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
