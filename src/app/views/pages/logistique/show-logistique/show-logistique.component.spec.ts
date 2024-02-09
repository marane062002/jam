import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLogistiqueComponent } from './show-logistique.component';

describe('ShowLogistiqueComponent', () => {
  let component: ShowLogistiqueComponent;
  let fixture: ComponentFixture<ShowLogistiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowLogistiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLogistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
