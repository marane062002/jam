import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEtablissementComponent } from './details-etablissement.component';

describe('DetailsEtablissementComponent', () => {
  let component: DetailsEtablissementComponent;
  let fixture: ComponentFixture<DetailsEtablissementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsEtablissementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
