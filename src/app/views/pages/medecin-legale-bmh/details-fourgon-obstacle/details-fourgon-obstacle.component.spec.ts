import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFourgonObstacleComponent } from './details-fourgon-obstacle.component';

describe('DetailsFourgonObstacleComponent', () => {
  let component: DetailsFourgonObstacleComponent;
  let fixture: ComponentFixture<DetailsFourgonObstacleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsFourgonObstacleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFourgonObstacleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
