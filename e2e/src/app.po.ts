import { browser, by, element } from 'protractor';
import { validUser } from '../../firebaseTestCredentials'


export class AppPage {
  navigateToRoot() {
    return browser.get('/');
  }
  inputLoginCredentialsAndLogin() {
    var email = element(by.css('${this.tag}${#email}'));
    var password = element(by.css('${this.tag}${#password}'));
    email.click();
    email.sendKeys(validUser.email);
    password.sendKeys(validUser.password);
    element(by.id('login')).click();
    return
  }
  checkPage() {
    return browser.getCurrentUrl();
  }
}
