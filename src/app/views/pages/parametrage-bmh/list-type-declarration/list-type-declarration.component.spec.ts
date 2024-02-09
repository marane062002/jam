import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeDeclarrationComponent } from './list-type-declarration.component';

describe('ListTypeDeclarrationComponent', () => {
  let component: ListTypeDeclarrationComponent;
  let fixture: ComponentFixture<ListTypeDeclarrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypeDeclarrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeDeclarrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
