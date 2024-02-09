import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdEtablissementComponent } from './upd-etablissement.component';

describe('UpdEtablissementComponent', () => {
  let component: UpdEtablissementComponent;
  let fixture: ComponentFixture<UpdEtablissementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdEtablissementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
