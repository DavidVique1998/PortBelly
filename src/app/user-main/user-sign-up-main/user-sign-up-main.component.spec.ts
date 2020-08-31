import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignUpMainComponent } from './user-sign-up-main.component';

describe('UserSignUpMainComponent', () => {
  let component: UserSignUpMainComponent;
  let fixture: ComponentFixture<UserSignUpMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSignUpMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignUpMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
