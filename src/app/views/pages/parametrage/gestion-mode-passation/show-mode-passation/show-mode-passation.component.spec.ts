import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowModePassationComponent } from './show-mode-passation.component';

describe('ShowModePassationComponent', () => {
  let component: ShowModePassationComponent;
  let fixture: ComponentFixture<ShowModePassationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowModePassationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowModePassationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
