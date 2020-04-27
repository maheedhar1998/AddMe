import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, AlertController, PopoverController, Events } from '@ionic/angular'
import { HomePage } from './home.page';
import { Router } from '@angular/router'
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

let imageSpy, popSpy, alertSpy, routerSpy, cameraSpy

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    imageSpy = jasmine.createSpyObj('ImagePicker', [''])
    popSpy = jasmine.createSpyObj('PopoverController', [''])
    alertSpy = jasmine.createSpyObj('AlertController', [''])
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    cameraSpy = jasmine.createSpyObj('Camera', [''])

    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      providers: [
        { provide: ImagePicker, useValue: imageSpy },
        { provide: PopoverController, useValue: popSpy },
        { provide: AlertController, useValue: alertSpy },
        { provide: Router, useValue: routerSpy },
        { provide: Camera, useValue: cameraSpy }
      ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
