import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTypeTraitementComponent } from './details-type-traitement.component';

describe('DetailsTypeTraitementComponent', () => {
  let component: DetailsTypeTraitementComponent;
  let fixture: ComponentFixture<DetailsTypeTraitementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTypeTraitementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTypeTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
