import { browser, by, element } from 'protractor';
import { validUser } from '../../firebaseTestCredentials'
import { delay } from 'q';


export class AppPage {
  navigateToRoot() {
    return browser.get('/login');
  }
  // inputLoginCredentialsAndLogin() {
  //   delay(30000);
  //   var email = element(by.css(`${'ion-content'}${'#email'}`));
  //   var password = element(by.css(`${'ion-content'}${'#password'}`));
  //   email.click();
  //   email.sendKeys(validUser.email);
  //   password.sendKeys(validUser.password);
  //   element(by.id('login')).click();
  //   return
  // }
  checkPage() {
    return browser.getCurrentUrl();
  }
  login() {
    browser.sleep(3000);
    const email = "test12@gmail.com";
    const password = "Aa1234";

    element(by.css("input[type='email']")).sendKeys(email);
    element(by.css("input[type='password']")).sendKeys(password);
    element(by.css('ion-button#login')).click();
    return;
  }
}
