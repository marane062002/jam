import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTypeAnalyseComponent } from './details-type-analyse.component';

describe('DetailsTypeAnalyseComponent', () => {
  let component: DetailsTypeAnalyseComponent;
  let fixture: ComponentFixture<DetailsTypeAnalyseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTypeAnalyseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTypeAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
