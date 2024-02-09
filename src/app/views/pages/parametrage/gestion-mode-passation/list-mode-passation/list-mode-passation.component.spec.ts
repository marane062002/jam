import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModePassationComponent } from './list-mode-passation.component';

describe('ListModePassationComponent', () => {
  let component: ListModePassationComponent;
  let fixture: ComponentFixture<ListModePassationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListModePassationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListModePassationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
