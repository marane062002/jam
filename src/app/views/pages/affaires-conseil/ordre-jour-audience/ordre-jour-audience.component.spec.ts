import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreJourAudienceComponent } from './ordre-jour-audience.component';

describe('OrdreJourAudienceComponent', () => {
  let component: OrdreJourAudienceComponent;
  let fixture: ComponentFixture<OrdreJourAudienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdreJourAudienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreJourAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
