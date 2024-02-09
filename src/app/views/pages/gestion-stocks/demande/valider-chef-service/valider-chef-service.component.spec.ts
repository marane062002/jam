import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderChefServiceComponent } from './valider-chef-service.component';

describe('ValiderChefServiceComponent', () => {
  let component: ValiderChefServiceComponent;
  let fixture: ComponentFixture<ValiderChefServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderChefServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderChefServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
