import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTraitementEffectueComponent } from './list-traitement-effectue.component';

describe('ListTraitementEffectueComponent', () => {
  let component: ListTraitementEffectueComponent;
  let fixture: ComponentFixture<ListTraitementEffectueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTraitementEffectueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTraitementEffectueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
