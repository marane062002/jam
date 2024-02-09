import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchandiseEtCarreauxComponent } from './marchandise-et-carreaux.component';

describe('VehiculesComponent', () => {
  let component: MarchandiseEtCarreauxComponent;
  let fixture: ComponentFixture<MarchandiseEtCarreauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarchandiseEtCarreauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchandiseEtCarreauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
