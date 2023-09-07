// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogUser', JSON.stringify(body))
    cy.visit('')
  })
})

//
//
// -- This is a child command --
Cypress.Commands.add('createBlog', ({ title, author, url, likes, user }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    contentType: 'application/json',
    body: { title, author, url, likes, user },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
    }
  })
  cy.visit('')
})

Cypress.Commands.add('createUser', ({ username, name, password }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/users`,
    method: 'POST',
    contentType: 'application/json',
    body: {
      username,
      name,
      password
    },
  })
  cy.visit('')
})

Cypress.Commands.add('resetData', () => {
  cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
})
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })