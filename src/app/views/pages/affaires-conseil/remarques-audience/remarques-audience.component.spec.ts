import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarquesAudienceComponent } from './remarques-audience.component';

describe('RemarquesAudienceComponent', () => {
  let component: RemarquesAudienceComponent;
  let fixture: ComponentFixture<RemarquesAudienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemarquesAudienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarquesAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
