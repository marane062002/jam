import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMedecinOperantComponent } from './update-medecin-operant.component';

describe('UpdateMedecinOperantComponent', () => {
  let component: UpdateMedecinOperantComponent;
  let fixture: ComponentFixture<UpdateMedecinOperantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMedecinOperantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMedecinOperantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
