import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuantiteComponent } from './update-quantite.component';

describe('UpdateQuantiteComponent', () => {
  let component: UpdateQuantiteComponent;
  let fixture: ComponentFixture<UpdateQuantiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateQuantiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateQuantiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
