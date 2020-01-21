import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    QRScanner,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private statusBar: StatusBar) {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyBVy4hzthYjRKiPg5t-bMtB_gOT5oouQkQ",
      authDomain: "addme-cd3be.firebaseapp.com",
      databaseURL: "https://addme-cd3be.firebaseio.com",
      projectId: "addme-cd3be",
      storageBucket: "addme-cd3be.appspot.com",
      messagingSenderId: "368953745648",
      appId: "1:368953745648:web:51fb2a333a3f8046c32235",
      measurementId: "G-WRWLV6WJ2S"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();
    this.statusBar.backgroundColorByName('white');
  }
}
