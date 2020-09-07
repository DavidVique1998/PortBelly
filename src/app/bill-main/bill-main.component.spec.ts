import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillMainComponent } from './bill-main.component';

describe('BillMainComponent', () => {
  let component: BillMainComponent;
  let fixture: ComponentFixture<BillMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
