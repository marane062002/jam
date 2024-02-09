import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuartierComponent } from './update-quartier.component';

describe('UpdateQuartierComponent', () => {
  let component: UpdateQuartierComponent;
  let fixture: ComponentFixture<UpdateQuartierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateQuartierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateQuartierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
