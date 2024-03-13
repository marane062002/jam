import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPersonnelComponent } from './show-personnel.component';

describe('ShowPersonnelComponent', () => {
  let component: ShowPersonnelComponent;
  let fixture: ComponentFixture<ShowPersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
