import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDemandeMissisonComponent } from './new-demande-missison.component';

describe('NewDemandeMissisonComponent', () => {
  let component: NewDemandeMissisonComponent;
  let fixture: ComponentFixture<NewDemandeMissisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDemandeMissisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDemandeMissisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
