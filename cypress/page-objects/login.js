export class LoginPage {
  //locators
  locatorsUsername = 'input[name="username"]';
  locatorspassword = 'input[name=password]';
  locatorsLoginButton = '[type=submit]';
  //methods
  setUsername(username) {
    cy.get(this.locatorsUsername).type(username);
  }
  setPassword(password) {
    cy.get(this.locatorspassword).type(password);
  }
  clickLoginButton() {
    cy.get(this.locatorsLoginButton).click();
  }
  validLogin() {
    cy.fixture('users.json').then((users) => {
      this.setUsername(users.valid.username);
      this.setPassword(users.valid.password);
    });
    this.clickLoginButton();
  }

  verifyLogin() {
    cy.url().should('include', '/dashboard');
  }
}

export const onLoginPage = new LoginPage();
