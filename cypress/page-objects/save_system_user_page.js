export class SaveSystemUserPage {
  //locators
  locatoesDropdownRoleClick =
    ':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text';
  locatoesDropdownRole = "[role='listbox']";
  locatoesDropdownStatusClick =
    ':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text';
  locatoesDropdownStatus = "[role='listbox']";
  locatorsListbox = '[role="listbox"]';
  locatorEmployeeName = '.oxd-autocomplete-text-input > input';
  locatorsUsername =
    ':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input';
  locatorsPassword =
    '.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input';
  locatorsConfirmPassword =
    ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input';
  locatorsSaveButton = '[type=submit]';

  //methods
  setUserRole(userRole) {
    cy.get(this.locatoesDropdownRoleClick).click();
    cy.get(this.locatoesDropdownRole).contains(userRole).click();
  }
  setEmployeeName(name) {
    cy.get(this.locatorEmployeeName).type(name);
    cy.get(this.locatorsListbox).contains(name).click();
  }
  setStatus(status) {
    cy.get(this.locatoesDropdownStatusClick).click();
    cy.get(this.locatoesDropdownStatus).contains(status).click();
  }
  setUsername(username) {
    cy.get(this.locatorsUsername).type(username);
  }
  setPassword(password) {
    cy.get(this.locatorsPassword).type(password);
  }
  setConfirmPassword(confirmPassword) {
    cy.get(this.locatorsConfirmPassword).type(confirmPassword);
  }
  clickSaveButton() {
    cy.get(this.locatorsSaveButton).click();
  }
  validSave() {
    cy.fixture('users.json').then((users) => {
      this.setUsername(users.newUser.username);
      this.setPassword(users.newUser.password);
      this.setConfirmPassword(users.newUser.password);
    });
    this.clickSaveButton();
  }
  addNewUser(setRole, setStatus) {
    this.setUserRole(setRole);
    cy.fixture('users.json').then((users) => {
      this.setEmployeeName(users.newUser.employeeName);
      this.setUsername(users.newUser.username);
      this.setPassword(users.newUser.password);
      this.setConfirmPassword(users.newUser.password);
    });
    this.setStatus(setStatus);
    this.clickSaveButton();
  }
  verifySave() {
    cy.url().should('include', '/admin/viewSystemUsers');
  }
}

export const onSaveSystemUserPage = new SaveSystemUserPage();
