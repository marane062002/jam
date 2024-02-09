import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AoDetailComponent } from './ao-detail.component';

describe('AoDetailComponent', () => {
  let component: AoDetailComponent;
  let fixture: ComponentFixture<AoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
