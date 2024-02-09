import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInterventionRapideComponent } from './show-intervention-rapide.component';

describe('ShowInterventionRapideComponent', () => {
  let component: ShowInterventionRapideComponent;
  let fixture: ComponentFixture<ShowInterventionRapideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowInterventionRapideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInterventionRapideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
