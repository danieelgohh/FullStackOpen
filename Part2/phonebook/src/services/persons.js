import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    request.then(response => response.data)
}

// const update = (newPerson) => {
//     const request = axios.put(`${baseUrl}/${id}`, newPerson)
//     request.then(response => response.data)
// }
const backendComms = { getAll, create, remove }
export default backendComms