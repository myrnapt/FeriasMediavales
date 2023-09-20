/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FairsComponent } from './fairs.component';

describe('FairsComponent', () => {
  let component: FairsComponent;
  let fixture: ComponentFixture<FairsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FairsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
