import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuartierComponent } from './add-quartier.component';

describe('AddQuartierComponent', () => {
  let component: AddQuartierComponent;
  let fixture: ComponentFixture<AddQuartierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuartierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuartierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
