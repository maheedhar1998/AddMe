import { browser } from 'protractor';
import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('goes to login page', () => {
    page.navigateToRoot();
    console.log(page.checkPage());
    expect(page.checkPage()).toBe('http://localhost:4200/login');
  });
  it('goes to sign up page', () => {
    page.navigateToSignUp();
    expect(page.checkPage()).toBe('http://localhost:4200/signup');
  });
  // it('should navigate back to login page form home page if a user is not logged in', () => {
  //   page.navigateToHome();
  //   browser.sleep(1000);
  //   expect(page.checkPage()).toBe('http://localhost:4200/login');
  // });
});
