import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeTraitementComponent } from './add-type-traitement.component';

describe('AddTypeTraitementComponent', () => {
  let component: AddTypeTraitementComponent;
  let fixture: ComponentFixture<AddTypeTraitementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeTraitementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
