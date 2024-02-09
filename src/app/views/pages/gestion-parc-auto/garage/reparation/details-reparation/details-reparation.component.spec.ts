import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsReparationComponent } from './details-reparation.component';

describe('DetailsReparationComponent', () => {
  let component: DetailsReparationComponent;
  let fixture: ComponentFixture<DetailsReparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsReparationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
