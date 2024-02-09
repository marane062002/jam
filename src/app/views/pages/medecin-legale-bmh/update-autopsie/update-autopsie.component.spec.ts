import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAutopsieComponent } from './update-autopsie.component';

describe('UpdateAutopsieComponent', () => {
  let component: UpdateAutopsieComponent;
  let fixture: ComponentFixture<UpdateAutopsieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAutopsieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAutopsieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
