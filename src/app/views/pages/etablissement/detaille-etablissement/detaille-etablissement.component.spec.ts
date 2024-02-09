import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleEtablissementComponent } from './detaille-etablissement.component';

describe('DetailleEtablissementComponent', () => {
  let component: DetailleEtablissementComponent;
  let fixture: ComponentFixture<DetailleEtablissementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailleEtablissementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
