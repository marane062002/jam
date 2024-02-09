import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTypeDeclarrationComponent } from './details-type-declarration.component';

describe('DetailsTypeDeclarrationComponent', () => {
  let component: DetailsTypeDeclarrationComponent;
  let fixture: ComponentFixture<DetailsTypeDeclarrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTypeDeclarrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTypeDeclarrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
