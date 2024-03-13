import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDemandesLicensesComponent } from './show-demandes-licenses.component';

describe('ShowDemandesLicensesComponent', () => {
  let component: ShowDemandesLicensesComponent;
  let fixture: ComponentFixture<ShowDemandesLicensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDemandesLicensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDemandesLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
