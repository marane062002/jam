import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAcquisitionComponent } from './list-acquisition.component';

describe('ListAcquisitionComponent', () => {
  let component: ListAcquisitionComponent;
  let fixture: ComponentFixture<ListAcquisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAcquisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAcquisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
