import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchantillonAoDetailComponent } from './echantillon-ao-detail.component';

describe('EchantillonAoDetailComponent', () => {
  let component: EchantillonAoDetailComponent;
  let fixture: ComponentFixture<EchantillonAoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchantillonAoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchantillonAoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
