import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrelevementComponent } from './list-prelevement.component';

describe('ListPrelevementComponent', () => {
  let component: ListPrelevementComponent;
  let fixture: ComponentFixture<ListPrelevementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPrelevementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPrelevementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
