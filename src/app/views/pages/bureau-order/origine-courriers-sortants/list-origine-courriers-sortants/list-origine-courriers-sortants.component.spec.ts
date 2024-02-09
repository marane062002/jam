import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrigineCourriersSortantsComponent } from './list-origine-courriers-sortants.component';

describe('ListOrigineCourriersSortantsComponent', () => {
  let component: ListOrigineCourriersSortantsComponent;
  let fixture: ComponentFixture<ListOrigineCourriersSortantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrigineCourriersSortantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrigineCourriersSortantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
