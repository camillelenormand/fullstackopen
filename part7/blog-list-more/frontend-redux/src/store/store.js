// store.js
import { configureStore } from "@reduxjs/toolkit"
import notificationsReducer from "./notificationsReducer"
import blogReducer from "./blogReducer"

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    blogs: blogReducer
  }
})

export default store

