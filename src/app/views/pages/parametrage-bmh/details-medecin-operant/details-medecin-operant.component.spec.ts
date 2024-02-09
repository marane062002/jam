import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMedecinOperantComponent } from './details-medecin-operant.component';

describe('DetailsMedecinOperantComponent', () => {
  let component: DetailsMedecinOperantComponent;
  let fixture: ComponentFixture<DetailsMedecinOperantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsMedecinOperantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMedecinOperantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
