import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router'
import { SuperTabsPage } from './super-tabs.page';

let routerSpy
describe('SuperTabsPage', () => {
  let component: SuperTabsPage;
  let fixture: ComponentFixture<SuperTabsPage>;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj("Router", ["navigate"])
    TestBed.configureTestingModule({
      declarations: [ SuperTabsPage ],
      providers: [
        {provide: Router, useValue: routerSpy}
      ],
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
