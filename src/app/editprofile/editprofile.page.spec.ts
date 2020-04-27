import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common'
import { IonicStorageModule } from '@ionic/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { EditprofilePage } from './editprofile.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { ImagePicker } from '@ionic-native/image-picker/ngx';
let cameraSpy, imagePickerSpy

describe('EditprofilePage', () => {
  let component: EditprofilePage;
  let fixture: ComponentFixture<EditprofilePage>;

  beforeEach(async(() => {
    cameraSpy = jasmine.createSpyObj('Camera', [''])
    imagePickerSpy = jasmine.createSpyObj('ImagePicker', [''])
    TestBed.configureTestingModule({
      declarations: [ EditprofilePage ],
      providers: [
        Location,
        { provide: Camera, useValue: cameraSpy },
        { provide: ImagePicker, useValue: imagePickerSpy },
      ],
      imports: [IonicStorageModule.forRoot(), RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
