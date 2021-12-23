//yarn run cypress open
const { v4: uuidv4 } = require("uuid");

describe("payment", () => {
  it("user can make payment", () => {
    // login
    cy.visit("/");
    cy.findByRole("textbox", { name: /username/i }).type("johndoe");
    cy.findByLabelText(/password/i).type("s3cret");
    cy.findByRole("checkbox", { name: /remember me/i }).check();
    cy.findByRole("button", { name: /sign in/i }).click();

    // check account balance
    let oldBalance;
    cy.get('[data-test="sidenav-user-balance"]').then(($balance) => (oldBalance = $balance.text()));

    // click on pay button
    cy.get('[data-test="nav-top-new-transaction"]').click();

    //search for user
    cy.findByRole("textbox").type("devon becker");
    cy.findByText(/devon becker/i).click();

    // add amount and note and click pay
    const payAmount = "30.00";
    cy.get("#amount").type(payAmount);
    let aboutAmmount = uuidv4();
    cy.get("#transaction-create-description-input").type(aboutAmmount);
    cy.get('[data-test="transaction-create-submit-payment"]').click();

    //return to transactions
    cy.get('[data-test="new-transaction-return-to-transactions"]').click();

    // go to personal payments
    cy.get('[data-test="nav-personal-tab"]').click();

    // click on payment
    cy.findByText(aboutAmmount).click({ force: true });

    // verify if payment was made
    cy.findByText(`-$${payAmount}`).should("be.visible");
    cy.findByText(aboutAmmount).should("be.visible");

    // verify if payment amount was deducted
    cy.get('[data-test="sidenav-user-balance"]').then(($balance) => {
      const convertedOldBalance = parseFloat(oldBalance.replace(/\$|,/g, ""));
      const convertedNewBalance = parseFloat($balance.text().replace(/\$|,/g, ""));
      expect(convertedOldBalance - convertedNewBalance).to.equal(parseFloat(payAmount));
    });
  });
});
