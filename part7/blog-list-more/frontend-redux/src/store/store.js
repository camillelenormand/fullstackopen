// store.js
import { configureStore } from "@reduxjs/toolkit"
import notificationsReducer from "./notificationsReducer"
import blogReducer from "./blogReducer"
import loginReducer from "./loginReducer"

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    blogs: blogReducer,
    login: loginReducer,
  }
})

export default store

