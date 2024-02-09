import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedecinOperantComponent } from './list-medecin-operant.component';

describe('ListMedecinOperantComponent', () => {
  let component: ListMedecinOperantComponent;
  let fixture: ComponentFixture<ListMedecinOperantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMedecinOperantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMedecinOperantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
