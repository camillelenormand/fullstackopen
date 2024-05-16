import { afterAll, afterEach, beforeAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// Establish API mocking before all tests.
beforeAll(() => {
})

afterEach(() => {
  cleanup()
})

