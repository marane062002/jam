import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLigneEchantillonComponent } from './edit-ligne-echantillon.component';

describe('EditLigneEchantillonComponent', () => {
  let component: EditLigneEchantillonComponent;
  let fixture: ComponentFixture<EditLigneEchantillonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLigneEchantillonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLigneEchantillonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
