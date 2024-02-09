import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesBOComponent } from './statistiques-bo.component';

describe('StatistiqueComponent', () => {
  let component: StatistiquesBOComponent;
  let fixture: ComponentFixture<StatistiquesBOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatistiquesBOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistiquesBOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
