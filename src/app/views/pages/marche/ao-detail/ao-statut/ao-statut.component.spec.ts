import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AoStatutComponent } from './ao-statut.component';

describe('AoStatutComponent', () => {
  let component: AoStatutComponent;
  let fixture: ComponentFixture<AoStatutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AoStatutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AoStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
