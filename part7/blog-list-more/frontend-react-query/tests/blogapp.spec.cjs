const { test, expect, beforeEach, describe, before } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
    await page.waitForLoadState('domcontentloaded')
  })

  test('front page can be opened', async ({ page }) => {
    const title = await page.textContent('h2')
    expect(title).toBeDefined()
  })

  test('user can log in successfully', async ({ page }) => {
    // Step 1: Click the login link
    await page.click('text=Login')

    // Step 2: Fill in the login form
    await page.fill('input[name="username"]', 'root')
    await page.fill('input[name="password"]', 'password')

    // Step 3: Submit the login form
    await page.click('button[type="submit"]')

    // Step 4: Check that the user is logged in
    const username = await page.textContent('text=root')
    expect(username).toBeDefined()

    // Step 5: Check that the login form is no longer visible
    const loginForm = await page.$('form')
    expect(loginForm).toBeNull()

    // Step 6: Check that the logout button is visible
    const logoutButton = await page.$('text=Logout')
    expect(logoutButton).not.toBeNull() // Changed from toBeDefined() to not.toBeNull()

    // Step 7: Check the notification message
    const notification = await page.textContent('text=Login successful')
    expect(notification).toBeDefined()
  })

  test('user can log out successfully', async ({ page }) => {
    // Step 1: Click the login link
    await page.click('text=Login')

    // Step 2: Fill in the login form
    await page.fill('input[name="username"]', 'root')
    await page.fill('input[name="password"]', 'password')

    // Step 3: Submit the login form
    await page.click('button[type="submit"]')

    // Step 4: Click the logout button
    await page.click('text=Logout')

    // Step 5: Check that the login link is visible again
    const loginLink = await page.$('text=Login')
    expect(loginLink).not.toBeNull() // Changed from toBeDefined() to not.toBeNull()

    // Step 6: Check the notification message
    const notification = await page.textContent('text=Logout successful')
    expect(notification).toBeDefined()
  })

  test('user can create a new blog', async ({ page }) => {
    // Step 1: Click the login link
    await page.click('text=Login')

    // Step 2: Fill in the login form
    await page.fill('input[name="username"]', 'root')
    await page.fill('input[name="password"]', 'password')

    // Step 3: Submit the login form
    await page.click('button[type="submit"]')

    // Step 4: Check that the user is logged in
    const username = await page.textContent('text=root')
    expect(username).toBeDefined()

    // Step 5: Check that the login form is no longer visible
    const loginForm = await page.$('form')
    expect(loginForm).toBeNull()

    // Step 6: Check that the logout button is visible
    const logoutButton = await page.$('text=Logout')
    expect(logoutButton).not.toBeNull() // Changed from toBeDefined() to not.toBeNull()

    // Step 7: Check the notification message
    const notificationLogin = await page.textContent('text=Login successful')
    expect(notificationLogin).toBeDefined()

    // Step 4: Click the new blog link
    await page.waitForLoadState('domcontentloaded')
    await page.waitForSelector('text=Create a New Blog')
    await page.click('text=Create a New Blog')
    await page.waitForSelector('input[name="title"]')

    // Step 5: Fill in the new blog form
    await page.fill('input[name="title"]', 'John Doe Blog')
    await page.fill('input[name="author"]', 'John Doe')
    await page.fill('input[name="url"]', 'www.johndoe.com')

    // Step 6: Submit the new blog form
    await page.click('button[type="submit"]')

    // Step 7: Check that the new blog is visible
    const newBlog = await page.textContent('text=John Doe Blog')
    expect(newBlog).toBeDefined()

    // Step 8: Check the notification message
    const notification = await page.textContent('text=Blog created successfully: John Doe Blog by John Doe')
    expect(notification).toBeDefined()
  })

  test('user can like a blog on the blog page', async ({ page }) => {
    // Step 1: Click the login link
    await page.click('text=Login')

    // Step 2: Fill in the login form
    await page.fill('input[name="username"]', 'root')
    await page.fill('input[name="password"]', 'password')

    // Step 3: Submit the login form
    await page.click('button[type="submit"]')

    // Step 4: Check that the user is logged in
    const username = await page.textContent('text=root')
    expect(username).toBeDefined()

    // Step 4: Go to the blog page
    await page.click('text=John Doe Blog')

    // Step 5: Like the blog
    await page.click('text=Like this article!')

    // Step 6: Check the notification message
    const notification = await page.textContent('text=Blog liked successfully')
    expect(notification).toBeDefined()
  })

  test('user can like a blog from the blog list page', async ({ page }) => {
    // Step 1: Click the login link
    await page.click('text=Login')

    // Step 2: Fill in the login form
    await page.fill('input[name="username"]', 'root')
    await page.fill('input[name="password"]', 'password')

    // Step 3: Submit the login form
    await page.click('button[type="submit"]')

    // Step 4: Check that the user is logged in
    const username = await page.textContent('text=root')
    expect(username).toBeDefined()

    // Step 5: Go to the blog page
    await page.click('text=Blogs')

    // Step 6: Click the like button
    await page.click('text=Like')

    // Step 7: Check the notification message
    const notification = await page.textContent('text=Blog liked successfully')
    expect(notification).toBeDefined()
  })

  test('user can delete a blog from the blog list page', async ({ page }) => {
    // Step 1: Click the login link
    await page.click('text=Login')

    // Step 2: Fill in the login form
    await page.fill('input[name="username"]', 'root')
    await page.fill('input[name="password"]', 'password')

    // Step 3: Submit the login form
    await page.click('button[type="submit"]')

    // Step 4: Check that the user is logged in
    await page.waitForSelector('text=root')
    const username = await page.textContent('text=root')
    expect(username).toBe('Welcome root!')

    // Step 5: Go to the blog page
    await page.click('text=Blogs')

    // Ensure the blog page is loaded
    await page.waitForSelector('text=John Doe Blog')

    // Step 6: Set up dialog handler and wait for the dialog
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Are you sure you want to delete John Doe Blog?')
      console.log('Dialog message:', dialog.message())
      await dialog.accept()
    })

    // Step 6: Click the delete button
    await page.click('text=Delete')

    // Step 8: Check the notification message
    const notification = await page.textContent('text=Blog deleted successfully')
    expect(notification).toBeDefined()
  })

})
