import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandesLicensesComponent } from './list-demandes-licenses.component';

describe('ListDemandesLicensesComponent', () => {
  let component: ListDemandesLicensesComponent;
  let fixture: ComponentFixture<ListDemandesLicensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDemandesLicensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDemandesLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
