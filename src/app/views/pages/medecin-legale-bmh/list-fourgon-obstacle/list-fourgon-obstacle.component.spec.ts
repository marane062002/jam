import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFourgonObstacleComponent } from './list-fourgon-obstacle.component';

describe('ListFourgonObstacleComponent', () => {
  let component: ListFourgonObstacleComponent;
  let fixture: ComponentFixture<ListFourgonObstacleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFourgonObstacleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFourgonObstacleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
