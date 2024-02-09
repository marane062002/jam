import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiculesssComponent } from './vehiculesss.component';


describe('VehiculesssComponent', () => {
  let component: VehiculesssComponent;
  let fixture: ComponentFixture<VehiculesssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculesssComponent ]
    })
    .compileComponents();
  })); 

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculesssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
