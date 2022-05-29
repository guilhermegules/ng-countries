// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    /**
     * Get one or more DOM elements by test id.
     *
     * @param id The test id
     * @param options The same options as cy.get
     */
    byTestId<E extends Node = HTMLElement>(
      id: string,
      options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>,
    ): Cypress.Chainable<JQuery<E>>;
  }
}

Cypress.Commands.add(
  'byTestId',
  // Borrow the signature from cy.get
  <E extends Node = HTMLElement>(
    id: string,
    options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>,
  ): Cypress.Chainable<JQuery<E>> => cy.get(`[data-testid="${id}"]`, options),
);
