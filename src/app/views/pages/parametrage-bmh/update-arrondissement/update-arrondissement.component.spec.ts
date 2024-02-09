import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateArrondissementComponent } from './update-arrondissement.component';

describe('UpdateArrondissementComponent', () => {
  let component: UpdateArrondissementComponent;
  let fixture: ComponentFixture<UpdateArrondissementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateArrondissementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateArrondissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
