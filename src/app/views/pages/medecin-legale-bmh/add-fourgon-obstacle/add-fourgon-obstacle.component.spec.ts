import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFourgonObstacleComponent } from './add-fourgon-obstacle.component';

describe('AddFourgonObstacleComponent', () => {
  let component: AddFourgonObstacleComponent;
  let fixture: ComponentFixture<AddFourgonObstacleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFourgonObstacleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFourgonObstacleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
