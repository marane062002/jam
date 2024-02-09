import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AoDashboardComponent } from './ao-dashboard.component';


describe('AoDashboardComponent', () => {
  let component: AoDashboardComponent;
  let fixture: ComponentFixture<AoDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AoDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
