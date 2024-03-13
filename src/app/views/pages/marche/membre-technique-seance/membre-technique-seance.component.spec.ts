import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreTechniqueSeanceComponent } from './membre-technique-seance.component';

describe('MembreTechniqueSeanceComponent', () => {
  let component: MembreTechniqueSeanceComponent;
  let fixture: ComponentFixture<MembreTechniqueSeanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembreTechniqueSeanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembreTechniqueSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
