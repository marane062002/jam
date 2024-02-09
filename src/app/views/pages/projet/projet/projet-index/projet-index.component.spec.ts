import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetIndexComponent } from './projet-index.component';

describe('ProjetIndexComponent', () => {
  let component: ProjetIndexComponent;
  let fixture: ComponentFixture<ProjetIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
