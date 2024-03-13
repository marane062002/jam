import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeIndicateurSdlComponent } from './list-type-indicateur-sdl.component';

describe('ListTypeIndicateurSdlComponent', () => {
  let component: ListTypeIndicateurSdlComponent;
  let fixture: ComponentFixture<ListTypeIndicateurSdlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypeIndicateurSdlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeIndicateurSdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
