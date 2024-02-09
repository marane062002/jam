import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdVisiteComponent } from './upd-visite.component';

describe('UpdVisiteComponent', () => {
  let component: UpdVisiteComponent;
  let fixture: ComponentFixture<UpdVisiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdVisiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
