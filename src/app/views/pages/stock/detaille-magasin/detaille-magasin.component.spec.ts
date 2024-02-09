import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleMagasinComponent } from './detaille-magasin.component';

describe('DetailleMagasinComponent', () => {
  let component: DetailleMagasinComponent;
  let fixture: ComponentFixture<DetailleMagasinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailleMagasinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
