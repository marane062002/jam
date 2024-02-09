import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHebergementComponent } from './add-hebergement.component';

describe('AddHebergementComponent', () => {
  let component: AddHebergementComponent;
  let fixture: ComponentFixture<AddHebergementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHebergementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHebergementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
