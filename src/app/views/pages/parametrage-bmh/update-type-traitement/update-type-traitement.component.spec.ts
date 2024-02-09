import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTypeTraitementComponent } from './update-type-traitement.component';

describe('UpdateTypeTraitementComponent', () => {
  let component: UpdateTypeTraitementComponent;
  let fixture: ComponentFixture<UpdateTypeTraitementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTypeTraitementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTypeTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
