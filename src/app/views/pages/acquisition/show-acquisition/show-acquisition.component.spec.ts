import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAcquisitionComponent } from './show-acquisition.component';

describe('ShowAcquisitionComponent', () => {
  let component: ShowAcquisitionComponent;
  let fixture: ComponentFixture<ShowAcquisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAcquisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAcquisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
