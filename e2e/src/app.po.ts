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
    return browser.baseUrl;
  }
}
