import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiWebhookDetailsComponent } from './api-webhook-details.component';

describe('ApiWebhookDetailsComponent', () => {
  let component: ApiWebhookDetailsComponent;
  let fixture: ComponentFixture<ApiWebhookDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiWebhookDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiWebhookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
