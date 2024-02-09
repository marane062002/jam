import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTypeDeclarrationComponent } from './update-type-declarration.component';

describe('UpdateTypeDeclarrationComponent', () => {
  let component: UpdateTypeDeclarrationComponent;
  let fixture: ComponentFixture<UpdateTypeDeclarrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTypeDeclarrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTypeDeclarrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
