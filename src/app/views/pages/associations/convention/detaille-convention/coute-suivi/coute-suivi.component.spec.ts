import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouteSuiviComponent } from './coute-suivi.component';

describe('CouteSuiviComponent', () => {
  let component: CouteSuiviComponent;
  let fixture: ComponentFixture<CouteSuiviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouteSuiviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouteSuiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
