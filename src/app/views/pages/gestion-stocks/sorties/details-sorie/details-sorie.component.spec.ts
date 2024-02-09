import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSorieComponent } from './details-sorie.component';

describe('DetailsSorieComponent', () => {
  let component: DetailsSorieComponent;
  let fixture: ComponentFixture<DetailsSorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
