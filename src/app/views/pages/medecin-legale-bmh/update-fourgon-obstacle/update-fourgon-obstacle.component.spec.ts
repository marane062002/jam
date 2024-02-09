import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFourgonObstacleComponent } from './update-fourgon-obstacle.component';

describe('UpdateFourgonObstacleComponent', () => {
  let component: UpdateFourgonObstacleComponent;
  let fixture: ComponentFixture<UpdateFourgonObstacleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFourgonObstacleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFourgonObstacleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
