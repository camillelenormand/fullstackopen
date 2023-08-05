const { faker } = require('@faker-js/faker')

function generateBlog() {
  const blog = {
    title: faker.lorem.sentence(),
    author: faker.person.fullName(),
    url: faker.internet.url(),
    likes: faker.number.int(100)
  }
  return blog
}

module.exports = {
  generateBlog
}

