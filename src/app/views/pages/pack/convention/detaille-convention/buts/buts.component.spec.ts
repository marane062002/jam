import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButsComponent } from './buts.component';

describe('ButsComponent', () => {
  let component: ButsComponent;
  let fixture: ComponentFixture<ButsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
