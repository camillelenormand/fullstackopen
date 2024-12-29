import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_NUMBER } from './queries'

const PhoneForm = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const [changeNumber, result] = useMutation(EDIT_NUMBER)

  const submit = (event) => {
    event.preventDefault()


    changeNumber({ variables: { name, phone } })

    setName('')
    setPhone('')
  }

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError('person not found')
    }
  }, [result.data])

  return (
    <div>
      <h2>Update Phone Number</h2>

      <form onSubmit={submit}>
        <div>
          <label>Name</label> <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label>Phone</label> <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button type='submit'>change number</button>
      </form>
    </div>
  )
}

export default PhoneForm