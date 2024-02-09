import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationTraitementComponent } from './reclamation-traitement.component';

describe('ReclamationTraitementComponent', () => {
  let component: ReclamationTraitementComponent;
  let fixture: ComponentFixture<ReclamationTraitementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamationTraitementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamationTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
