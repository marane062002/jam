import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetShowComponent } from './projet-show.component';

describe('ProjetShowComponent', () => {
  let component: ProjetShowComponent;
  let fixture: ComponentFixture<ProjetShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
