import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDemandesPubPropComponent } from './show-demandes-pub-prop.component';

describe('ShowDemandesPubPropComponent', () => {
  let component: ShowDemandesPubPropComponent;
  let fixture: ComponentFixture<ShowDemandesPubPropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDemandesPubPropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDemandesPubPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
