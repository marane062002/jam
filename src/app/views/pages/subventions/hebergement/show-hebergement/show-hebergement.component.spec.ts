import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHebergementComponent } from './show-hebergement.component';

describe('ShowHebergementComponent', () => {
  let component: ShowHebergementComponent;
  let fixture: ComponentFixture<ShowHebergementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHebergementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHebergementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
