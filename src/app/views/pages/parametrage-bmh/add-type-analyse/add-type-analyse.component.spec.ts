import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeAnalyseComponent } from './add-type-analyse.component';

describe('AddTypeAnalyseComponent', () => {
  let component: AddTypeAnalyseComponent;
  let fixture: ComponentFixture<AddTypeAnalyseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeAnalyseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
