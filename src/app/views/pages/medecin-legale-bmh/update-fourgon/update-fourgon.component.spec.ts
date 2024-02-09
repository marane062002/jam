import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFourgonComponent } from './update-fourgon.component';

describe('UpdateFourgonComponent', () => {
  let component: UpdateFourgonComponent;
  let fixture: ComponentFixture<UpdateFourgonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFourgonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFourgonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
