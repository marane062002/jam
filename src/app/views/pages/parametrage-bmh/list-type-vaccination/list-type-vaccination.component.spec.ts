import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeVaccinationComponent } from './list-type-vaccination.component';

describe('ListTypeVaccinationComponent', () => {
  let component: ListTypeVaccinationComponent;
  let fixture: ComponentFixture<ListTypeVaccinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypeVaccinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
