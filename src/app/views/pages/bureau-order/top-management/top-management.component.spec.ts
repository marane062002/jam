import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopManagementComponent } from './top-management.component';

describe('TopManagementComponent', () => {
  let component: TopManagementComponent;
  let fixture: ComponentFixture<TopManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
