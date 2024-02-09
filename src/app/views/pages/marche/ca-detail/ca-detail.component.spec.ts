import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaDetailComponent } from './ca-detail.component';

describe('CaDetailComponent', () => {
  let component: CaDetailComponent;
  let fixture: ComponentFixture<CaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
