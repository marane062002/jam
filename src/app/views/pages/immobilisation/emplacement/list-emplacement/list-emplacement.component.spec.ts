import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmplacementComponent } from './list-emplacement.component';

describe('ListEmplacementComponent', () => {
  let component: ListEmplacementComponent;
  let fixture: ComponentFixture<ListEmplacementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEmplacementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
