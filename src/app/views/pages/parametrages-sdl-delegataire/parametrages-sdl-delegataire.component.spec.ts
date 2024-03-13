import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametragesSdlDelegataireComponent } from './parametrages-sdl-delegataire.component';

describe('ParametragesSdlDelegataireComponent', () => {
  let component: ParametragesSdlDelegataireComponent;
  let fixture: ComponentFixture<ParametragesSdlDelegataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametragesSdlDelegataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametragesSdlDelegataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
