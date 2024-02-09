import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheMagasinComponent } from './fiche-magasin.component';

describe('FicheMagasinComponent', () => {
  let component: FicheMagasinComponent;
  let fixture: ComponentFixture<FicheMagasinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheMagasinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
