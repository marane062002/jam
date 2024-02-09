import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderDirecteurComponent } from './valider-directeur.component';

describe('ValiderDirecteurComponent', () => {
  let component: ValiderDirecteurComponent;
  let fixture: ComponentFixture<ValiderDirecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderDirecteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
