import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetUrbanismeComponent } from './projet-urbanisme.component';

describe('ProjetUrbanismeComponent', () => {
  let component: ProjetUrbanismeComponent;
  let fixture: ComponentFixture<ProjetUrbanismeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetUrbanismeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetUrbanismeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
