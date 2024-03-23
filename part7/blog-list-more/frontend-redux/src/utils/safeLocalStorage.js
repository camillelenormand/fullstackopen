const safeLocalStorage = {
  setItem(key, value) {
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.error('Local Storage Error:', error)
    }
  },
  getItem(key) {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.error('Local Storage Error:', error)
      return null
    }
  },
  removeItem(key) {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Local Storage Error:', error)
    }
  }
}

export default safeLocalStorage