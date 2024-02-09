import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDecesNaturelComponent } from './list-deces-naturel.component';

describe('ListDecesNaturelComponent', () => {
  let component: ListDecesNaturelComponent;
  let fixture: ComponentFixture<ListDecesNaturelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDecesNaturelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDecesNaturelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
