import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreJourSessionDetailComponent } from './ordre-jour-session-detail.component';

describe('OrdreJourSessionDetailComponent', () => {
  let component: OrdreJourSessionDetailComponent;
  let fixture: ComponentFixture<OrdreJourSessionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdreJourSessionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreJourSessionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
