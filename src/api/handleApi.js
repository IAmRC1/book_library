import axios from 'axios'

const token = localStorage.getItem('assignment_token')
const baseURL = 'http://assignment.cyberboxer.com'

const handleApi = async (url, method, isTokenIncluded, formBody = {}) => {
  
  let headers = {
    'Content-Type': 'multipart/form-data'
  }

  if(isTokenIncluded){
    headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  }

  return await axios.request({ url, method, baseURL, headers, data: formBody })
}

export default handleApi;