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
  constructor(private router: Router, private qrScanCtrl: QRScanner) {
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
  ngOnInit(){
    this.qrScanCtrl.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // Open camera preview
        this.qrScanCtrl.show();
        const scanSub = this.qrScanCtrl.scan().subscribe((text: string) => {
          // At this point, a QR code was recognized and scanned
          // The QR data is stored in 'text'...
          let newCon: backend.contact = JSON.parse(text).qContact;
          this.fire.addToUserContacts(newCon);
          // Close QR scanner
          this.qrScanCtrl.hide();
          this.qrScanCtrl.destroy();
          scanSub.unsubscribe()
          
        });
      }
      else if (status.denied) {
        alert('camera permission denied');
        this.qrScanCtrl.openSettings();
      }
    })
    .catch((e: any) => {alert(e)});
  }
}
