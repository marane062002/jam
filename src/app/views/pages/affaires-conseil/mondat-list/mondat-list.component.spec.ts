import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MondatListComponent } from './mondat-list.component';

describe('MondatListComponent', () => {
  let component: MondatListComponent;
  let fixture: ComponentFixture<MondatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MondatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MondatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
