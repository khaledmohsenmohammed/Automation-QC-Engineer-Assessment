const { onAdminPage } = require('../page-objects/admin_page');
const { onLoginPage } = require('../page-objects/login');
const {
  SaveSystemUserPage,
  onSaveSystemUserPage,
} = require('../page-objects/save_system_user_page');
const { onSideMenu } = require('../page-objects/side_menu');

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
    onLoginPage.validLogin();
  });

  it('Move to Admin & Get the number of records found', () => {
    onSideMenu.clickAdminMenu();
    onAdminPage.verifyAdminPage();
    onAdminPage.numberOfUsersCount();
    onAdminPage.verifyNumberOfUsers();
  });

  it('Move to Admin & Click Add Button', () => {
    onSideMenu.clickAdminMenu();
    onAdminPage.verifyAdminPage();
    onAdminPage.clickAddButton();
    onAdminPage.verifayAddButton();
  });

  it('add a new user & deleat it ', () => {
    onSideMenu.clickAdminMenu();
    onAdminPage.clickAddButton();
    onSaveSystemUserPage.setUserRole('Admin');
    onSaveSystemUserPage.setStatus('Enabled');
    onSaveSystemUserPage.setEmployeeName('Odis');
    onSaveSystemUserPage.setUsername('test user khaled');
    onSaveSystemUserPage.setPassword('n*w2@3+MC6eseQp');
    onSaveSystemUserPage.setConfirmPassword('n*w2@3+MC6eseQp');
    onSaveSystemUserPage.clickSaveButton();
    // After saving the new user, wait for the success message to appear & find the element we created
    cy.contains('.oxd-table-row', 'test user khaled', { timeout: 10000 })
      .should('be.visible') // Ensures the row is visible
      .find('.oxd-icon-button') // Finds the button(s) within the row
      .eq(0) // Selects the first button (adjust the index based on which button you need)
      .click(); // Clicks the selected button

    // After clicking the delete icon, wait for the delete confirmation button to appear
    cy.get('.oxd-button--label-danger', { timeout: 10000 })
      .should('be.visible') // Ensure the button is visible and interactable
      .click(); // Clicks the confirmation button to delete

    // After clicking the delete confirmation button, shuld be the row is not exist
    cy.contains('.oxd-table-row', 'test user khaled').should('not.exist');
  });
});
