import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AoListComponent } from './ao-list.component';

describe('AoListComponent', () => {
  let component: AoListComponent;
  let fixture: ComponentFixture<AoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
