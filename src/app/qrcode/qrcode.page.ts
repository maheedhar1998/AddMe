import { Component, OnInit } from '@angular/core';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QRcodePage implements OnInit {
  private obj: string;
  constructor() {
    this.obj = "fuck";
  }

  ngOnInit() {
  }

}
