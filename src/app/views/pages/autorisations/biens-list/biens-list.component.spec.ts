import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiensListComponent } from './biens-list.component';

describe('BiensListComponent', () => {
  let component: BiensListComponent;
  let fixture: ComponentFixture<BiensListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiensListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiensListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
