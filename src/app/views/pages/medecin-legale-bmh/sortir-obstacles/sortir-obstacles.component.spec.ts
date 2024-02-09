import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortirObstaclesComponent } from './sortir-obstacles.component';

describe('SortirObstaclesComponent', () => {
  let component: SortirObstaclesComponent;
  let fixture: ComponentFixture<SortirObstaclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortirObstaclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortirObstaclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
