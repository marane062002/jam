import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionRapideComponent } from './intervention-rapide.component';

describe('InterventionRapideComponent', () => {
  let component: InterventionRapideComponent;
  let fixture: ComponentFixture<InterventionRapideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventionRapideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionRapideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
