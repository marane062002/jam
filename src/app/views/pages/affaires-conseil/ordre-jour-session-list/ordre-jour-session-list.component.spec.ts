import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreJourSessionListComponent } from './ordre-jour-session-list.component';

describe('OrdreJourSessionListComponent', () => {
  let component: OrdreJourSessionListComponent;
  let fixture: ComponentFixture<OrdreJourSessionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdreJourSessionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreJourSessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
