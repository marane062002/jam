import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresDeposeseCommissionAoDetailComponent } from './offres-deposese-commission-ao-detail.component';

describe('OffresDeposeseCommissionAoDetailComponent', () => {
  let component: OffresDeposeseCommissionAoDetailComponent;
  let fixture: ComponentFixture<OffresDeposeseCommissionAoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffresDeposeseCommissionAoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffresDeposeseCommissionAoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
