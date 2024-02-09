import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSecteurComponent } from './edit-secteur.component';

describe('EditSecteurComponent', () => {
  let component: EditSecteurComponent;
  let fixture: ComponentFixture<EditSecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSecteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
