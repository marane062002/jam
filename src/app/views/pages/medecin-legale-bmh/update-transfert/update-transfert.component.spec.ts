import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTransfertComponent } from './update-transfert.component';

describe('UpdateTransfertComponent', () => {
  let component: UpdateTransfertComponent;
  let fixture: ComponentFixture<UpdateTransfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTransfertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
