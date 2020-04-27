import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router'
import { ToastController } from '@ionic/angular'
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { CameraPage } from './camera.page';

let routerSpy, qrSpy, toastSpy

describe('CameraPage', () => {
  let component: CameraPage;
  let fixture: ComponentFixture<CameraPage>;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    toastSpy = jasmine.createSpyObj('ToastController', [''])
    qrSpy = jasmine.createSpyObj('QRScanner', ['hide', 'prepare', 'show', 'scan', 'pausePreview', 'destroy'])
    TestBed.configureTestingModule({
      declarations: [ CameraPage ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: QRScanner, useValue: qrSpy },
        { provide: ToastController, useValue: toastSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
