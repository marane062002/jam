import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeMarcheComponent } from './add-type-marche.component';

describe('AddTypeMarcheComponent', () => {
  let component: AddTypeMarcheComponent;
  let fixture: ComponentFixture<AddTypeMarcheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeMarcheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
