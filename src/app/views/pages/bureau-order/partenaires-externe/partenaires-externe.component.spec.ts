import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartenairesExterneComponent } from './partenaires-externe.component';

describe('PartenairesExterneComponent', () => {
  let component: PartenairesExterneComponent;
  let fixture: ComponentFixture<PartenairesExterneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartenairesExterneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartenairesExterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
