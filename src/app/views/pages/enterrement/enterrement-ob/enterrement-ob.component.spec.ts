import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterrementObComponent } from './enterrement-ob.component';

describe('EnterrementObComponent', () => {
  let component: EnterrementObComponent;
  let fixture: ComponentFixture<EnterrementObComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterrementObComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterrementObComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
