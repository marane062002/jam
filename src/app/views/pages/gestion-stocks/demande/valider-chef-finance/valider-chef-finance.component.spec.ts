import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderChefFinanceComponent } from './valider-chef-finance.component';

describe('ValiderChefFinanceComponent', () => {
  let component: ValiderChefFinanceComponent;
  let fixture: ComponentFixture<ValiderChefFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderChefFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderChefFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
