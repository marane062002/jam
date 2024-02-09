import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTraitementEffectueComponent } from './update-traitement-effectue.component';

describe('UpdateTraitementEffectueComponent', () => {
  let component: UpdateTraitementEffectueComponent;
  let fixture: ComponentFixture<UpdateTraitementEffectueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTraitementEffectueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTraitementEffectueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
