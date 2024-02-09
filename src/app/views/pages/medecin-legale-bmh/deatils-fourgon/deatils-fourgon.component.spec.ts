import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeatilsFourgonComponent } from './deatils-fourgon.component';

describe('DeatilsFourgonComponent', () => {
  let component: DeatilsFourgonComponent;
  let fixture: ComponentFixture<DeatilsFourgonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeatilsFourgonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeatilsFourgonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
