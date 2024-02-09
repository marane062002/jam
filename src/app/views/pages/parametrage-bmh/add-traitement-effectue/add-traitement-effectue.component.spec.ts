import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTraitementEffectueComponent } from './add-traitement-effectue.component';

describe('AddTraitementEffectueComponent', () => {
  let component: AddTraitementEffectueComponent;
  let fixture: ComponentFixture<AddTraitementEffectueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTraitementEffectueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTraitementEffectueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
