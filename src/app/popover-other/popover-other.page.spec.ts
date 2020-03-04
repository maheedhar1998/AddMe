import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverOtherPage } from './popover-other.page';

describe('PopoverOtherPage', () => {
  let component: PopoverOtherPage;
  let fixture: ComponentFixture<PopoverOtherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverOtherPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverOtherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
