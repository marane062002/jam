import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSousTypeComponent } from './details-sous-type.component';

describe('DetailsSousTypeComponent', () => {
  let component: DetailsSousTypeComponent;
  let fixture: ComponentFixture<DetailsSousTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSousTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSousTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
