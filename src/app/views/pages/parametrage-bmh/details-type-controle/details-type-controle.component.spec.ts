import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTypeControleComponent } from './details-type-controle.component';

describe('DetailsTypeControleComponent', () => {
  let component: DetailsTypeControleComponent;
  let fixture: ComponentFixture<DetailsTypeControleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTypeControleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTypeControleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
