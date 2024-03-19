import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandesPubPropComponent } from './list-demandes-pub-prop.component';

describe('ListDemandesPubPropComponent', () => {
  let component: ListDemandesPubPropComponent;
  let fixture: ComponentFixture<ListDemandesPubPropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDemandesPubPropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDemandesPubPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
