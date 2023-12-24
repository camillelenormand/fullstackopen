import { createSlice } from "@reduxjs/toolkit"

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
    },
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      console.log(JSON.parse(JSON.stringify(state)))

      return state.map(note => 
        note.id !== id ? note: changedNote)
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})

export const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
export default noteSlice.reducer

// const noteReducer = (state = initialState, action) => {
//   console.log('ACTION: ', action)
//   switch(action.type) {

//     case 'NEW_NOTE':
//       return [...state, action.payload]

//     case 'TOGGLE_IMPORTANCE': {
//       const id = action.payload.id
//       const noteToChange = state.find(n => n.id === id)
//       const changedNote = { 
//         ...noteToChange, 
//         important: !noteToChange.important 
//       }
//       return state.map(note =>
//         note.id !== id ? note : changedNote 
//       )
//      }
//     default:
//       return state
//   }
// }


// export const createNote = (content) => {
//   return {
//     type: 'NEW_NOTE',
//     payload: {
//       content,
//       important: false,
//       id: generateId()
//     }
//   }
// }

// export const toggleImportanceOf = (id) => {
//   return {
//     type: 'TOGGLE_IMPORTANCE',
//     payload: { id }
//   }
// }

// export default noteReducer