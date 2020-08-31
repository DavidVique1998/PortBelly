import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignInFormComponent } from './user-sign-in-form.component';

describe('UserSignInFormComponent', () => {
  let component: UserSignInFormComponent;
  let fixture: ComponentFixture<UserSignInFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSignInFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
