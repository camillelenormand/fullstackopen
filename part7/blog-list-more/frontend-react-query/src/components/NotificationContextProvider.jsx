import { useReducer, useMemo } from 'react'
import NotificationContext from '../contexts/NotificationContext' // Adjust the import path as needed
// Optional: import PropTypes from 'prop-types'

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(reducer, null)

  const contextValue = useMemo(() => ({ notification, dispatch }), [notification])

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  )
}

// Optional: Add prop types for validation
// NotificationContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// }

export default NotificationContextProvider
