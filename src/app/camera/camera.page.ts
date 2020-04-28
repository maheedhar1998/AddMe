import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { FirebaseBackendService } from '../firebase-backend.service';
import * as firebase from 'firebase';
import * as backend from '../backendClasses';
import { ToastController } from '@ionic/angular'

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  private fire: FirebaseBackendService;
  private profile: backend.user;
  constructor(private router: Router,
              private qrScanCtrl: QRScanner,
              private toastController: ToastController) {
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
    this.qrScanCtrl.hide()
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
          this.qrScanCtrl.pausePreview()
          let newCon: backend.contact = JSON.parse(text)['qContact'];
          let newQid: string = JSON.parse(text)['qid']
          if(newCon.getAccessSocials == null) {
            let tempFire: FirebaseBackendService = new FirebaseBackendService(newQid);
            await tempFire.getUserData().then(async usr => {
              this.profile = usr;
              newCon = this.profile.getQrCodes[0]['qContact'];
              this.fire.addToUserContacts(newCon);
  
              const toast = await this.toastController.create({
                message: `${newCon.name} has been added to your contact list!`,
                duration: 4000,
                color: "success"
              });
              toast.present();
              
              // Close QR scanner
              this.qrScanCtrl.hide();
              this.qrScanCtrl.destroy();
              scanSub.unsubscribe();
              this.router.navigate(['home']);
            });
          } else {
            this.fire.addToUserContacts(newCon);
            const toast = await this.toastController.create({
              message: `${newCon.name} has been added to your contact list!`,
              duration: 8000,
              color: "success"
            });
            toast.present();
            
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
    .catch((e: any) => {console.log("error: e", alert(e))});
  }

  ionViewDidLeave()
  {
    this.qrScanCtrl.destroy();
  }
}
