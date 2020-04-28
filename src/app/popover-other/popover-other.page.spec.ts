import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router'
import { NavParams } from '@ionic/angular';
import { PopoverOtherPage } from './popover-other.page';

let routerSpy, navParamsSpy
describe('PopoverOtherPage', () => {
  let component: PopoverOtherPage;
  let fixture: ComponentFixture<PopoverOtherPage>;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj("Router", ['navigate'])
    navParamsSpy = jasmine.createSpyObj("NavParams", [''])
    TestBed.configureTestingModule({
      declarations: [ PopoverOtherPage ],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: NavParams, useValue: navParamsSpy}
      ],
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
