import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeControleComponent } from './list-type-controle.component';

describe('ListTypeControleComponent', () => {
  let component: ListTypeControleComponent;
  let fixture: ComponentFixture<ListTypeControleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypeControleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeControleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
