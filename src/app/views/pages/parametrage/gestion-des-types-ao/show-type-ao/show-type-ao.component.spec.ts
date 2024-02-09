import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTypeAoComponent } from './show-type-ao.component';

describe('ShowTypeAoComponent', () => {
  let component: ShowTypeAoComponent;
  let fixture: ComponentFixture<ShowTypeAoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTypeAoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTypeAoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
