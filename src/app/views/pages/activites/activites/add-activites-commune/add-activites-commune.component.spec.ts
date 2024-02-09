import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActivitesCommuneComponent } from './add-activites-commune.component';

describe('AddActivitesCommuneComponent', () => {
  let component: AddActivitesCommuneComponent;
  let fixture: ComponentFixture<AddActivitesCommuneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddActivitesCommuneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActivitesCommuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
