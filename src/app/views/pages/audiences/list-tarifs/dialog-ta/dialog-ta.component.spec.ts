import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTaComponent } from './dialog-ta.component';

describe('DialogTaComponent', () => {
  let component: DialogTaComponent;
  let fixture: ComponentFixture<DialogTaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
