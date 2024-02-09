import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreJourSessionEditComponent } from './ordre-jour-session-edit.component';

describe('OrdreJourSessionEditComponent', () => {
  let component: OrdreJourSessionEditComponent;
  let fixture: ComponentFixture<OrdreJourSessionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdreJourSessionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreJourSessionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
