import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStructureSdlComponent } from './list-structure-sdl.component';

describe('ListStructureSdlComponent', () => {
  let component: ListStructureSdlComponent;
  let fixture: ComponentFixture<ListStructureSdlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStructureSdlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStructureSdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
