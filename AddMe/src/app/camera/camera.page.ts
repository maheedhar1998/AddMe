import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  constructor(private router: Router, private qrScanCtrl: QRScanner) { }

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
          alert(`QR Code Scanned!: ${text}`)
          // The QR data is stored in 'text'...

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
