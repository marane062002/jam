import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProgrammePrevisionnelComponent } from './list-programme-previsionnel.component';

describe('ListProgrammePrevisionnelComponent', () => {
  let component: ListProgrammePrevisionnelComponent;
  let fixture: ComponentFixture<ListProgrammePrevisionnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProgrammePrevisionnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProgrammePrevisionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
