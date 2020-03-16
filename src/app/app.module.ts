import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import firebaseConfig from '../../firebaseConfig'
import * as firebase from 'firebase';
import { CallNumber } from '@ionic-native/call-number/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    QRScanner,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CallNumber,
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private statusBar: StatusBar) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
    this.statusBar.backgroundColorByName('white');
  }
}
