import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTraitementEffectueComponent } from './details-traitement-effectue.component';

describe('DetailsTraitementEffectueComponent', () => {
  let component: DetailsTraitementEffectueComponent;
  let fixture: ComponentFixture<DetailsTraitementEffectueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTraitementEffectueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTraitementEffectueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
