import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeIndexComponent } from './conge-index.component';

describe('CongeIndexComponent', () => {
  let component: CongeIndexComponent;
  let fixture: ComponentFixture<CongeIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongeIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
