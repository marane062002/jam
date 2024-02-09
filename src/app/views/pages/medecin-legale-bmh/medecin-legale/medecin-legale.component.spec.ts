import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinLegaleComponent } from './medecin-legale.component';

describe('MedecinLegaleComponent', () => {
  let component: MedecinLegaleComponent;
  let fixture: ComponentFixture<MedecinLegaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinLegaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinLegaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
