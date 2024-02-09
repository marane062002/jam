import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantiteReapprovisionnementComponent } from './quantite-reapprovisionnement.component';

describe('QuantiteReapprovisionnementComponent', () => {
  let component: QuantiteReapprovisionnementComponent;
  let fixture: ComponentFixture<QuantiteReapprovisionnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantiteReapprovisionnementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantiteReapprovisionnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
