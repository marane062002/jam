import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleActionComponent } from './detaille-action.component';

describe('DetailleActionComponent', () => {
  let component: DetailleActionComponent;
  let fixture: ComponentFixture<DetailleActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailleActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
