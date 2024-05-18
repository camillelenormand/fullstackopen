import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// Establish API mocking before all tests.

afterEach(() => {
  cleanup()
})

