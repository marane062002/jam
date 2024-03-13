import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecesStatsComponent } from './deces-stats.component';

describe('DecesStatsComponent', () => {
  let component: DecesStatsComponent;
  let fixture: ComponentFixture<DecesStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecesStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecesStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
