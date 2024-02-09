import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeAnalyseComponent } from './list-type-analyse.component';

describe('ListTypeAnalyseComponent', () => {
  let component: ListTypeAnalyseComponent;
  let fixture: ComponentFixture<ListTypeAnalyseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypeAnalyseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
