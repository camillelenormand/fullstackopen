describe('Blog app', () => {
  beforeEach(() => {
    cy.resetData()
    cy.createUser({
      username: 'camillelenormand@fake.com',
      name: 'camillelenormand',
      password: 'password@123',
    })
    cy.createUser({
      username: 'camillelenormand2@fake.com',
      name: 'camillelenormand2',
      password: 'password@123',
    })
  })

  it('front page can be opened', () => {
    cy.contains('Blogs')
    cy.contains('Application Blog from Fullstackopen.com')
  })

  it('login form is shown', () => {
    cy.get('#loginButton').click()
  })

  describe('Login via form', () => {
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
      cy.login({
        username: 'camillelenormand@fake.com',
        password: 'password@123'
      })
      cy.createBlog({
        title: 'My Blog',
        author: 'Camille',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 10,
        user: {
          username: 'camillelenormand@fake.com',
          name: 'camillelenormand',
        }
      })
      cy.login({
        username: 'camillelenormand2@fake.com',
        password: 'password@123'
      })
      cy.createBlog({
        title: 'The other blog',
        author: 'John',
        url: 'http://www.cs.html',
        likes: 5,
        user: {
          username: 'camillelenormand2@fake.com',
          name: 'camillelenormand2',
        }
      })
      cy.login({
        username: 'camillelenormand@fake.com',
        password: 'password@123'
      })
    })

    it('a new blog can be created', () => {
      cy.get('#newBlogButton').click()
      cy.get('#title').type('Test blog')
      cy.get('#author').type('Camille')
      cy.get('#url').type('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
      cy.get('#createButton').click()
    })

    it('users can like a blog', () => {
      cy.get('#newBlogButton').click()
      cy.get('#title').type('My Blog')
      cy.get('#author').type('Camille')
      cy.get('#url').type('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
      cy.get('#createButton').click()
      cy.get('#showDetailsButton').click()
      cy.contains('My Blog')
      cy.contains('Likes: 10')
      cy.get('#likeButton').click()
      cy.contains('Likes: 11')
    })

    it('user who created a blog can delete it', () => {
      cy.get('#newBlogButton').click()
      cy.get('#title').type('Test blog')
      cy.get('#author').type('Camille')
      cy.get('#url').type('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
      cy.get('#createButton').click()
      cy.get('#showDetailsButton').click()
      cy.get('#deleteButton').click()
    })

    it('only the creator can see the delete button of a blog', () => {
      cy.get('.blog').eq(1).find('#showDetailsButton').click().find('#deleteButton').should('not.exist')
    })

    it('blogs are ordered by likes', () => {
      cy.get('#newBlogButton').click()
      cy.get('#title').type('Test blog')
      cy.get('#author').type('Camille')
      cy.get('#url').type('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
      cy.get('#createButton').click()
      cy.get('#showDetailsButton').click()
      cy.get('#likeButton').click()

      cy.get('#title').type('Test blog2')
      cy.get('#author').type('Camille')
      cy.get('#url').type('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
      cy.get('#createButton').click()

      cy.get('.blog').eq(0).should('contain', 'My Blog')
      cy.get('.blog').eq(1).should('contain', 'The other blog')
      cy.get('.blog').eq(2).should('contain', 'Test blog')
      cy.get('.blog').eq(3).should('contain', 'Test blog2')
    })
  })
})