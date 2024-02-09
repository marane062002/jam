import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReintigrationComponent } from './reintigration.component';

describe('ReintigrationComponent', () => {
  let component: ReintigrationComponent;
  let fixture: ComponentFixture<ReintigrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReintigrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReintigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
