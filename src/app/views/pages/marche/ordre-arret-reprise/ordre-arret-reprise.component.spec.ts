import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreArretRepriseComponent } from './ordre-arret-reprise.component';

describe('OrdreArretRepriseComponent', () => {
  let component: OrdreArretRepriseComponent;
  let fixture: ComponentFixture<OrdreArretRepriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdreArretRepriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreArretRepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
