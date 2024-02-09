import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MondatDetailComponent } from './mondat-detail.component';

describe('MondatDetailComponent', () => {
  let component: MondatDetailComponent;
  let fixture: ComponentFixture<MondatDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MondatDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MondatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
