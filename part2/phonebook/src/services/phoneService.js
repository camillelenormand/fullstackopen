import axios from 'axios'
const baseUrl = '/api/persons'

const getAllPersons = async () => {
  try {
    const response = await axios.get(baseUrl)
    console.log("------- get people request --------", response)
    return response.data
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

const createPerson = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject);
    console.log("------- Create person request --------", response)
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

const updatePerson = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
const deletePerson = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

const phoneService = { getAllPersons, createPerson, updatePerson, deletePerson }

export default phoneService