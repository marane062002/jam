import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreJourSessionFormComponent } from './ordre-jour-session-form.component';

describe('OrdreJourSessionFormComponent', () => {
  let component: OrdreJourSessionFormComponent;
  let fixture: ComponentFixture<OrdreJourSessionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdreJourSessionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreJourSessionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
