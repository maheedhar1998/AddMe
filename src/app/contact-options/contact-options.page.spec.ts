import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PopoverController, AlertController, NavParams } from '@ionic/angular'
import { ContactOptionsPage } from './contact-options.page';
let popoverSpy, alertSpy, navParamsSpy, routerSpy

describe('ContactOptionsPage', () => {
  let component: ContactOptionsPage;
  let fixture: ComponentFixture<ContactOptionsPage>;

  beforeEach(async(() => {
    popoverSpy = jasmine.createSpyObj('PopoverController', [''])
    alertSpy = jasmine.createSpyObj('AlertController', [''])
    navParamsSpy = jasmine.createSpyObj('NavParams', [''])
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])

    TestBed.configureTestingModule({
      declarations: [ ContactOptionsPage ],
      providers: [
        {provide: PopoverController, useValue: popoverSpy},
        {provide: Router, useValue: routerSpy},
        {provide: NavParams, useValue: navParamsSpy},
        {provide: AlertController, useValue: alertSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
