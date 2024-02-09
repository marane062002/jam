import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedecinOperantComponent } from './add-medecin-operant.component';

describe('AddMedecinOperantComponent', () => {
  let component: AddMedecinOperantComponent;
  let fixture: ComponentFixture<AddMedecinOperantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMedecinOperantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedecinOperantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
