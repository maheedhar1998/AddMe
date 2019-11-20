import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  constructor(private router: Router) { }

  goToHome() {
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

}
