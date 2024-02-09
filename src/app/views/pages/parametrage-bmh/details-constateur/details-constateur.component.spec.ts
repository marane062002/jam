import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsConstateurComponent } from './details-constateur.component';

describe('DetailsConstateurComponent', () => {
  let component: DetailsConstateurComponent;
  let fixture: ComponentFixture<DetailsConstateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsConstateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsConstateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
