import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  constructor(private router: Router, private qrScanner: QRScanner) { }

  goToHome() {
    this.router.navigate(['home']);
  }

  ngOnInit() {
    this.qrScanner.prepare().then((state: QRScannerStatus) => {
      if(state.authorized) {
        let scan = this.qrScanner.scan().subscribe((txt: string) => {
          console.log("scanned: ", txt);
          this.qrScanner.hide();
          scan.unsubscribe();
        });
      } else if(state.denied) {
        this.qrScanner.openSettings();
      }
    }).catch((e: any) => console.log('Error: ', e));
  }

}
