import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';
import * as backend from '../backendClasses';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  private fire: FirebaseBackendService;
  private profile: backend.user;
  constructor(private router: Router, private qrScanCtrl: QRScanner, private alertController: AlertController) {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser)
      {
        this.router.navigate(['login']);
      }
      else
      {
        this.fire = new FirebaseBackendService(firebase.auth().currentUser.uid);
      }
    });
  }

  goToHome() {
    this.router.navigate(['home']);
  }
  async ngOnInit(){
    this.qrScanCtrl.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // Open camera preview
        this.qrScanCtrl.show();
        const scanSub = this.qrScanCtrl.scan().subscribe(async (text: string) => {
          // At this point, a QR code was recognized and scanned
          // The QR data is stored in 'text'...
          let newCon: backend.contact = JSON.parse(text)['qContact'];
          let newQid: string = JSON.parse(text)['qid']
          alert(newCon);
          if(newCon.getAccessSocials == null) {
            let tempFire: FirebaseBackendService = new FirebaseBackendService(newQid);
            await tempFire.getUserData().then(async usr => {
              this.profile = usr;
              newCon = this.profile.getQrCodes[0]['qContact'];
              this.fire.addToUserContacts(newCon);
              const alert = await this.alertController.create({
                header: 'Contact Added',
                message: `Your friend ${newCon.getName} has been added to your contact list`,
                buttons: ['OK']
              });
              await alert.present();
              // Close QR scanner
              this.qrScanCtrl.hide();
              this.qrScanCtrl.destroy();
              scanSub.unsubscribe();
              this.router.navigate(['home']);
            });
          } else {
            this.fire.addToUserContacts(newCon);
            const alert = await this.alertController.create({
              header: 'Contact Added',
              message: `Your friend ${newCon.getName} has been added to your contact list`,
              buttons: ['OK']
            });
            await alert.present();
            // Close QR scanner
            this.qrScanCtrl.hide();
            this.qrScanCtrl.destroy();
            scanSub.unsubscribe();
            this.router.navigate(['home']);
          }
        });
      } else if (status.denied) {
        alert('camera permission denied');
        this.qrScanCtrl.openSettings();
      }
    })
    .catch((e: any) => {alert(e)});
  }
}
