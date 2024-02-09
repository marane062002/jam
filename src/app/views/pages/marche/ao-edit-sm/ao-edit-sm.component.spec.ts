import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AoEditSmComponent } from './ao-edit-sm.component';

describe('AoEditSmComponent', () => {
  let component: AoEditSmComponent;
  let fixture: ComponentFixture<AoEditSmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AoEditSmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AoEditSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
