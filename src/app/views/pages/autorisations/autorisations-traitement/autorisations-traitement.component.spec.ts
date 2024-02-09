import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorisationsTraitementComponent } from './autorisations-traitement.component';

describe('AutorisationsTraitementComponent', () => {
  let component: AutorisationsTraitementComponent;
  let fixture: ComponentFixture<AutorisationsTraitementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorisationsTraitementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorisationsTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
