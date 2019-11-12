import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private email: string;
  private password: string;
  constructor(private route: Router) { }

  ngOnInit() {
  }
  signup() {
    this.route.navigate(['/signup()'])
  }
  login() {
    if(this.email == "" || this.password == "") {
      alert("Please enter an Email and/or Password");
    } else {
      // ask firebase for authentication of login
    }
  }
}
