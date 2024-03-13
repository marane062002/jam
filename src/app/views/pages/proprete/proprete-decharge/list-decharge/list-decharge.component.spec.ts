import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDechargeComponent } from './list-decharge.component';

describe('ListDechargeComponent', () => {
  let component: ListDechargeComponent;
  let fixture: ComponentFixture<ListDechargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDechargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
