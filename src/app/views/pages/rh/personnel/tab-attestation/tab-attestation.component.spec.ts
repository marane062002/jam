import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAttestationComponent } from './tab-attestation.component';

describe('TabAttestationComponent', () => {
  let component: TabAttestationComponent;
  let fixture: ComponentFixture<TabAttestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAttestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
