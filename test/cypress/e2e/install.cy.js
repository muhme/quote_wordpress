/// <reference types="cypress" />

// Copyright (c) 2023 Heiko Lübbe
// This software is licensed under the MIT License.
// For the full license text, see the LICENSE file in the project root or visit https://opensource.org/licenses/MIT
//
// Cypress automated WordPress and plugin installation

describe("Install WordPress and plugin zitat-service", () => {
  it("Install WordPress", function () {
    // load installation page
    cy.visit("/wp-admin/install.php");

    // choose language
    cy.get("select#language").select("English (United States)");
    cy.get("input#language-continue", { timeout: 30000 }).click();

    // give information needed
    cy.wait( 2000 ); // wait for password generation
    cy.get("input#weblog_title").type(Cypress.env("title"));
    cy.get("input#user_login").type(Cypress.env("user"));
    cy.get("input#pass1").clear().type(Cypress.env("password"));
    cy.get("input.pw-checkbox").click();
    cy.get("input#admin_email").clear().type(Cypress.env("email"));
    // click 'Install WordPress'
    cy.get("input#submit", { timeout: 30000 }).click();
  });
  it("Admin Login", function () {
    cy.visit("/wp-login.php");
    cy.get("#user_login").type(Cypress.env("user"));
    cy.get("#user_pass").type(Cypress.env("password"));
    cy.get("#wp-submit").click();
    cy.url().should(url => {
        expect(url.endsWith('/wp-admin/')).to.be.true;
    });    
  });
});
