import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AoVisiteComponent } from './ao-visite.component';

describe('AoVisiteComponent', () => {
  let component: AoVisiteComponent;
  let fixture: ComponentFixture<AoVisiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AoVisiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AoVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
