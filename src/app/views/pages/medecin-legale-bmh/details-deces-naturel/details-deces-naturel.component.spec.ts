import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDecesNaturelComponent } from './details-deces-naturel.component';

describe('DetailsDecesNaturelComponent', () => {
  let component: DetailsDecesNaturelComponent;
  let fixture: ComponentFixture<DetailsDecesNaturelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDecesNaturelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDecesNaturelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
