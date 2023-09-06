describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'camillelenormand@fake.com',
      name: 'camillelenormand',
      password: 'password@123',
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', () => {
    cy.contains('Blogs')
    cy.contains('Application Blog from Fullstackopen.com by Camille Lenormand')
  })

  it('login form is shown', () => {
    cy.contains('Sign in').click()
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('Sign in').click()
      cy.get('#username').type('camillelenormand@fake.com')
      cy.get('#password').type('password@123')
      cy.get('#login-button').click()
      cy.contains('Personal Information')
      cy.contains('Username: camillelenormand@fake.com')
      cy.contains('Name: camillelenormand')
    })

    it('login fails with wrong password', () => {
      cy.contains('Sign in').click()
      cy.get('#username').type('camillelenormand@fake.com')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.notification').should('contain', 'Wrong username or password')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.notification').should('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Personal Information')
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.contains('Sign in').click()
      cy.get('#username').type('camillelenormand@fake.com')
      cy.get('#password').type('password@123')
      cy.get('#login-button').click()
    })

    it('a blog can be created', () => {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('Test blog')
      cy.get('#author').type('Camille')
      cy.get('#url').type('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
      cy.get('#create-button').click()
    })
  })
})


