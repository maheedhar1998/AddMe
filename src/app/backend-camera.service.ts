import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class BackendCameraService {
  constructor() { }
  // Takes a photo using the front camera
  async takeSelfie(cam: Camera): Promise<string> {
    var urlPic: string;
    const options: CameraOptions = {
      quality: 75,
      destinationType: cam.DestinationType.DATA_URL,
      encodingType: cam.EncodingType.JPEG,
      mediaType: cam.MediaType.PICTURE,
      correctOrientation: true
    };
    // alert("options");
    var profilePic: string;
    await cam.getPicture(options).then((imageData) => {
      profilePic = imageData;
    }, (err) => {
      // alert(err);
      profilePic = "N/A";
    });
    return profilePic;
  }
}
