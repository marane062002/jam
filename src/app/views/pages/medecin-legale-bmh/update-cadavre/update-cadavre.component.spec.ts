import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCadavreComponent } from './update-cadavre.component';

describe('UpdateCadavreComponent', () => {
  let component: UpdateCadavreComponent;
  let fixture: ComponentFixture<UpdateCadavreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCadavreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCadavreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
