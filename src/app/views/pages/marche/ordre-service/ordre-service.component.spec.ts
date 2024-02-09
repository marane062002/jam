import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreServiceComponent } from './ordre-service.component';

describe('OrdreServiceComponent', () => {
  let component: OrdreServiceComponent;
  let fixture: ComponentFixture<OrdreServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdreServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
