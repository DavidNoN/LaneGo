import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBriefcaseComponent } from './edit-briefcase.component';

describe('EditBriefcaseComponent', () => {
  let component: EditBriefcaseComponent;
  let fixture: ComponentFixture<EditBriefcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBriefcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBriefcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
