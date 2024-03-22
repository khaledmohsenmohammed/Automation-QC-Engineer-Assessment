export class AdminPage {
  //locators
  locatorsAddButton = '.orangehrm-header-container > .oxd-button';
  verifyAddButttonUrl = '/admin/saveSystemUser';
  textTotalUsers = '.orangehrm-horizontal-padding > .oxd-text';
  //methods
  clickAddButton() {
    cy.get(this.locatorsAddButton).click();
  }
  verifyAdminPage() {
    cy.url().should('include', '/admin');
  }
  verifayAddButton() {
    //url should be /admin/viewSystemUsers
    cy.url().should('include', this.verifyAddButttonUrl);
  }
  numberOfUsersCount() {
    cy.get('.oxd-table-row--with-border')
      .not(':first')
      .then((rows) => {
        const numberOfRecords = rows.length;
        cy.wrap(numberOfRecords).as('numberOfRecords'); // Storing the count in an alias
      });
  }
  verifyNumberOfUsers() {
    cy.get('@numberOfRecords').then((numberOfRecords) => {
      cy.get(this.textTotalUsers).should('contain', numberOfRecords); // Verifying the count is displayed on the page
    });
  }
}

export const onAdminPage = new AdminPage();
