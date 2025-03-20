describe('template spec', () => {

  const randomEmail = `user${Date.now()}${Math.random().toString(10).substring(7)}@example.com`;
  const password = 'TestPassword123';

  it('should register a new user, add product to cart, and verify it', () => {

    // Open the website
    cy.visit('https://demowebshop.tricentis.com');

    // Click on the Register 
    cy.contains('Register').click();

    // Fill in personal details
    cy.get('#FirstName').type('John');
    cy.get('#LastName').type('Doe');
    cy.get('#Email').type(randomEmail); // Use the random email
    cy.get('#Password').type(password);
    cy.get('#ConfirmPassword').type(password);

    // Submit the registration form
    cy.get('#register-button').click();

    // Assert the text
    cy.contains('Your registration completed').should('be.visible');


    // Assert the email appears in the header
    cy.get('.header-links > ul > :nth-child(1) > .account')
      .should('include.text', randomEmail);

    cy.get('.top-menu > :nth-child(5) > a').click()

    cy.get('.product-item').first().within(() => {
      cy.get('.button-2.product-box-add-to-cart-button').click(); 
    });

    cy.get('.ico-cart > .cart-label').click()

    cy.get('.product-name').first()
      .should('contain.text', '3rd Album');


  })
})