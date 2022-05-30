describe('NgCountries main tests', () => {
  beforeEach(() => {
    cy.intercept({ method: 'GET', url: 'https://restcountries.com/v3.1/all' }, { fixture: 'countries.json' }).as(
      'getAllCountries',
    );

    cy.intercept(
      { method: 'GET', url: 'https://restcountries.com/v3.1/name/dominican' },
      { fixture: 'dominican-republic.json' },
    ).as('getCountryByName');

    cy.intercept(
      { method: 'GET', url: 'https://restcountries.com/v3.1/name/heard' },
      { fixture: 'heard-island.json' },
    ).as('getCountryByName');

    cy.intercept(
      { method: 'GET', url: 'https://restcountries.com/v3.1/alpha?codes=hti' },
      { fixture: 'haiti.json' },
    ).as('getCountryByCodes');
  });

  it('Visits the initial page and click on first card, then come back to initial page and click on the second card then click on border country', () => {
    cy.visit('/');

    cy.contains('Where in the world?');

    cy.get('body').should('have.css', 'background-color', 'rgb(250, 250, 250)');

    const firstCountryCard = cy.byTestId('country-card-0');

    firstCountryCard.should('exist');

    firstCountryCard.click();

    cy.contains('Dominican Republic');

    cy.byTestId('details-country-image').should('exist');

    const firstBorderButton = cy.byTestId('country-details-border-country-button-0');

    firstBorderButton.should('exist');

    firstBorderButton.click();

    cy.byTestId('redirect-button').click();

    const secondCountryCard = cy.byTestId('country-card-1');

    secondCountryCard.click();

    cy.contains('Heard Island and McDonald Islands');

    const changeThemeButton = cy.byTestId('change-theme-button');

    changeThemeButton.click();

    cy.byTestId('redirect-button').click();

    cy.get('body').should('have.css', 'background-color', 'rgb(32, 44, 55)');
  });
});
