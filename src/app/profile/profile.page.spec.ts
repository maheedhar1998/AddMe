import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProfilePage } from './profile.page';
import { PopoverController, Events } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

let callSpy, routerSpy, popSpy, eventSpy

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async(() => {
    callSpy = jasmine.createSpyObj('CallNumber', [''])
    eventSpy = jasmine.createSpyObj('Events', [''])
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    popSpy = jasmine.createSpyObj('PopoverController', [''])
    TestBed.configureTestingModule({
      declarations: [ ProfilePage ],
      providers: [
        { provide: CallNumber, useValue: callSpy },
        { provide: Events, useValue: eventSpy },
        { provide: PopoverController, useValue: popSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
