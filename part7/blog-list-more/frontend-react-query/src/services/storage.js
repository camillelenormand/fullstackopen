// frontend-react-query/src/services/storage.js
const KEY = 'blogAppUser'

const saveUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user))
}

const loadUser = () => {
  return JSON.parse(window.localStorage.getItem(KEY))
}

const removeUser = () => {
  localStorage.removeItem(KEY)
}

export default {
  saveUser, loadUser, removeUser
}