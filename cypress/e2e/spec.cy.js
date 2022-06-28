describe("Treinando automação", () => {

  beforeEach(() => {
    cy.visit("https://courses.ultimateqa.com/users/sign_in");
    cy.intercept('POST', '**/*google.com/recaptcha/api2/**', { statusCode: 200, body: `["rresp","",null,null,null,""]`})
  });


  it('Login sem cadastro deve ser negado', () => {
    cy.location('pathname').should('eq', '/users/sign_in')

    cy.get('[id="user[email]"]').type(Cypress.env('user_email'));
    cy.get('[id="user[password]"]').type(Cypress.env('user_password'));
    cy.get('[id="user[remember_me]"]').check();
    cy.get('.form__button-group > .button').click()

    cy.get('.form-error__list-item').should("be.visible")
  });
});


  it('Criando login', () => {
    cy.visit("https://courses.ultimateqa.com/users/sign_in")

    cy.location('pathname').should('eq', '/users/sign_in')

    cy.get('.sign-in__sign-up > a').click()

    cy.get('[id="user[first_name]"]').type(Cypress.env('user_firstName'));
    cy.get('[id="user[last_name]"]').type(Cypress.env('user_lastName'));
    cy.get('[id="user[email]"]').type(Cypress.env('user_newEmail'));
    cy.get('[id="user[password]"]').type(Cypress.env('user_newPassword'));

    cy.get('[id="user[terms]"]').check();

    cy.get('.form__button-group > .button').click()

    cy.location('pathname').should('eq', '/collections')
  });


  it('Login com cadastro', () => {
    cy.visit("https://courses.ultimateqa.com/users/sign_in");
    cy.location('pathname').should('eq', '/users/sign_in')

    cy.get('[id="user[email]"]').type(Cypress.env('user_newEmail'));
    cy.get('[id="user[password]"]').type(Cypress.env('user_newPassword'));
    cy.get('[id="user[remember_me]"]').check();
    cy.get('.form__button-group > .button').click()

    cy.get('.message-text').should("be.visible")
    cy.get('.dropdown__toggle-button').should("be.visible")
  });



