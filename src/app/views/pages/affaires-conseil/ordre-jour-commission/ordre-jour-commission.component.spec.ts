import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreJourCommissionComponent } from './ordre-jour-commission.component';

describe('OrdreJourCommissionComponent', () => {
  let component: OrdreJourCommissionComponent;
  let fixture: ComponentFixture<OrdreJourCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdreJourCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreJourCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
