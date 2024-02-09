import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreJourBureauComponent } from './ordre-jour-bureau.component';

describe('OrdreJourBureauComponent', () => {
  let component: OrdreJourBureauComponent;
  let fixture: ComponentFixture<OrdreJourBureauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdreJourBureauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreJourBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
