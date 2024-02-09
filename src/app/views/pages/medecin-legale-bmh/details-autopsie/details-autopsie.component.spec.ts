import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAutopsieComponent } from './details-autopsie.component';

describe('DetailsAutopsieComponent', () => {
  let component: DetailsAutopsieComponent;
  let fixture: ComponentFixture<DetailsAutopsieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsAutopsieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAutopsieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
