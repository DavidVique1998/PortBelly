import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignInMainComponent } from './user-sign-in-main.component';

describe('UserSignInMainComponent', () => {
  let component: UserSignInMainComponent;
  let fixture: ComponentFixture<UserSignInMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSignInMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignInMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
