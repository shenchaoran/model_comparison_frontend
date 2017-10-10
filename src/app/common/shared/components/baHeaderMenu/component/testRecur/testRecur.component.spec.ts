/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestRecurComponent } from './testRecur.component';

describe('TestRecurComponent', () => {
  let component: TestRecurComponent;
  let fixture: ComponentFixture<TestRecurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestRecurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRecurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
