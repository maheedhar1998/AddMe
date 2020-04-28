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
  it('should login with valid credentials', () => {
    page.navigateToRoot();
    page.login();
    expect(page.checkPage()).toBe('http://localhost:4200/home');
  });
});
