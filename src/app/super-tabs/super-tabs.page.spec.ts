import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperTabsPage } from './super-tabs.page';

describe('SuperTabsPage', () => {
  let component: SuperTabsPage;
  let fixture: ComponentFixture<SuperTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperTabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
