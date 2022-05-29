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
  });

  it('Visits the initial page and click on first card, then come back to initial page and click on the second card then click on border country', () => {
    cy.visit('/');

    cy.contains('Where in the world?');

    const firstCountryCard = cy.byTestId('country-card-0');

    firstCountryCard.should('exist');

    firstCountryCard.click();

    cy.contains('Dominican Republic');

    cy.byTestId('details-country-image').should('exist');

    cy.byTestId('redirect-button').click();

    const secondCountryCard = cy.byTestId('country-card-1');

    secondCountryCard.click();

    cy.contains('Heard Island and McDonald Islands');
  });
});
