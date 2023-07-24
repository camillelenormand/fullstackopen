import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = async () => {
  return axios.get(baseUrl)
}

const createPerson = newObject => {
  return axios.post(baseUrl, newObject)
}

const updatePerson = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const phoneService = { getAllPersons, createPerson, updatePerson, deletePerson }

export default phoneService