import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPreviewsComponent } from './event-previews.component';

describe('EventPreviewsComponent', () => {
  let component: EventPreviewsComponent;
  let fixture: ComponentFixture<EventPreviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventPreviewsComponent]
    });
    fixture = TestBed.createComponent(EventPreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
