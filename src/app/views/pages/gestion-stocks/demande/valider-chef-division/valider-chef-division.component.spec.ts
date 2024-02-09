import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderChefDivisionComponent } from './valider-chef-division.component';

describe('ValiderChefDivisionComponent', () => {
  let component: ValiderChefDivisionComponent;
  let fixture: ComponentFixture<ValiderChefDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderChefDivisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderChefDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
