import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleEnterrementComponent } from './detaille-enterrement.component';

describe('DetailleEnterrementComponent', () => {
  let component: DetailleEnterrementComponent;
  let fixture: ComponentFixture<DetailleEnterrementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailleEnterrementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleEnterrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
