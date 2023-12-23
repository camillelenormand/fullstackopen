// reducers/anecdoteFilterReducer.js 
import { createSlice } from '@reduxjs/toolkit'

// reducer
// const anecdoteFilterReducer = (state = null, action) => {
//   console.log(state)
//   console.log(action)
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }

// action
// export const filterChange = (filter) => {
//   return {
//     type: 'SET_FILTER',
//     payload: filter
//   }
// }

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterChange(state, action) {
      return action.payload
    }
  }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer