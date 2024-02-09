import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiensDetailComponent } from './biens-detail.component';

describe('BiensDetailComponent', () => {
  let component: BiensDetailComponent;
  let fixture: ComponentFixture<BiensDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiensDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiensDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
