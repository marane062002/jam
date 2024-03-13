import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreSeanceComponent } from './membre-seance.component';

describe('MembreSeanceComponent', () => {
  let component: MembreSeanceComponent;
  let fixture: ComponentFixture<MembreSeanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembreSeanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembreSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
