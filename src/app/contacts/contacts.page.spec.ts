import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router'
import { ContactsPage } from './contacts.page';
import { NavParams, Events, ToastController } from '@ionic/angular'
let routerSpy, navParamsSpy, toastSpy, eventSpy

describe('ContactsPage', () => {
  let component: ContactsPage;
  let fixture: ComponentFixture<ContactsPage>;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    navParamsSpy = jasmine.createSpyObj('NavParams', [''])
    toastSpy = jasmine.createSpyObj('ToastController', [''])
    eventSpy = jasmine.createSpyObj('Event', [''])

    TestBed.configureTestingModule({
      declarations: [ ContactsPage ],
      providers: [
        { provide: Router, useValue: routerSpy},
        { provide: NavParams, useValue: routerSpy},
        { provide: ToastController, useValue: routerSpy},
        { provide: Events, useValue: routerSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hasDuplicate() can detect array duplicates',() => {
    const socialAccounts = [
      { user: 'patrick' },
      { user: 'devsage' },
      { user: 'scott' }
    ]
    const result = component.hasDuplicateAccount('devsage', socialAccounts)
    expect(result).toBeTruthy()
  })

  it('hasDuplicate() can detect no duplicates',() => {
    const socialAccounts = [
      { user: 'patrick' },
      { user: 'devsage' },
      { user: 'scott' }
    ]
    const result = component.hasDuplicateAccount('devsage', socialAccounts)
    expect(result).toBeTruthy()
  })

  it('hasDuplicate() should detect no duplicates in empty array',() => {
    const result = component.hasDuplicateAccount('devsage', [])
    expect(result).toBeFalsy()
  })
});
