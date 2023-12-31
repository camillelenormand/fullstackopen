import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote, updateNote } from './request'

const App = () => {
  const queryClient = useQueryClient()
  
  const newNoteMutation = useMutation({ 
    mutationFn: createNote,
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(newNote))
    }
  })
  
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true})
    console.log(content) 
  }

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries(['notes'])
    }
  })

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important})
    console.log('toggle importance of', note.id)
  }

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const notes = result.data

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Importance</th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => (
            <tr key={note.id} onClick={() => toggleImportance(note)}>
              <td><i>{note.content}</i></td>
              <td><strong>{note.important ? 'Important' : ''}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App