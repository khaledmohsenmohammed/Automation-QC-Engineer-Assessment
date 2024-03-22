export class SideMenu {
  //locators
  adminMenu = 'Admin';
  //methods
  clickAdminMenu() {
    cy.contains(this.adminMenu).click();
  }
}

export const onSideMenu = new SideMenu();
