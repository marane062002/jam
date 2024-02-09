import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVaccinationStatutComponent } from './list-vaccination-statut.component';

describe('ListVaccinationStatutComponent', () => {
  let component: ListVaccinationStatutComponent;
  let fixture: ComponentFixture<ListVaccinationStatutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVaccinationStatutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVaccinationStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
