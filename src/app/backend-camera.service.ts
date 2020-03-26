import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class BackendCameraService {
  constructor(private cam: Camera) { }
  // Takes a photo using the front camera
  async takeSelfie(): Promise<string> {
    var urlPic: string;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.cam.DestinationType.DATA_URL,
      encodingType: this.cam.EncodingType.JPEG,
      mediaType: this.cam.MediaType.PICTURE,
      correctOrientation: true
    };
    alert("options");
    var profilePic: string;
    await this.cam.getPicture(options).then((imageData) => {
      profilePic = imageData;
    }, (err) => {
      alert(err);
      profilePic = "N/A";
    });
    return profilePic;
  }
}
