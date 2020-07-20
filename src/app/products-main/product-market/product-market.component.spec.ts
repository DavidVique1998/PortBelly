import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMarketComponent } from './product-market.component';

describe('ProductMarketComponent', () => {
  let component: ProductMarketComponent;
  let fixture: ComponentFixture<ProductMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
