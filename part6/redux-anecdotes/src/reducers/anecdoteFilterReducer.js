// reducers/anecdoteFilterReducer.js 

// reducer
const anecdoteFilterReducer = (state = null, action) => {
  console.log(state)
  console.log(action)
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}

// action
export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter
  }
}

export default anecdoteFilterReducer