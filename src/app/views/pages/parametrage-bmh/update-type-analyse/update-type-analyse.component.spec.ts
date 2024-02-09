import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTypeAnalyseComponent } from './update-type-analyse.component';

describe('UpdateTypeAnalyseComponent', () => {
  let component: UpdateTypeAnalyseComponent;
  let fixture: ComponentFixture<UpdateTypeAnalyseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTypeAnalyseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTypeAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
