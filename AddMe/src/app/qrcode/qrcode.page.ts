import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QRcodePage implements OnInit {
  qrData = 'https://github.com/SCCapstone/AddMe';
  elementType: 'url' | 'canvas' | 'img' = 'canvas';

  constructor(private router: Router) {}

  goToHome(){
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

}
