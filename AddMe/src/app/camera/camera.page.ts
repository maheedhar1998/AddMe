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
        alert("authorized");
        this.qrScanner.useBackCamera();

        this.qrScanner.show();
        this.qrScanner.scan().subscribe(txt => {
          alert(txt);
          this.qrScanner.hide();
        });
      } else if(state.denied) {
        alert("denied");
        this.qrScanner.openSettings();
      }
    }).catch((e: any) => alert('Error: '+e));
  }

}
