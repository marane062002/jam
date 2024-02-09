import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeTraitementComponent } from './list-type-traitement.component';

describe('ListTypeTraitementComponent', () => {
  let component: ListTypeTraitementComponent;
  let fixture: ComponentFixture<ListTypeTraitementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypeTraitementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
