import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCourriersSortantsComponent } from './list-courriers-sortants.component';

describe('ListCourriersSortantsComponent', () => {
  let component: ListCourriersSortantsComponent;
  let fixture: ComponentFixture<ListCourriersSortantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCourriersSortantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCourriersSortantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
