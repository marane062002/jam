import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcListComponent } from './bc-list.component';

describe('BcListComponent', () => {
  let component: BcListComponent;
  let fixture: ComponentFixture<BcListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
