import axios from 'axios'

const token = JSON.parse(localStorage.getItem('userData'))?.token
console.log(`token`, token)
const baseURL = 'http://localhost:4000/api/v1'

const handleApi = async (url, method, isTokenIncluded = false, formBody = {}) => {

  let headers;
  
  if(isTokenIncluded){
    headers = {
      'Authorization': `Bearer ${token}`
    }
  }

  const data = await axios.request({ 
    url: `${baseURL}${url}`, 
    method, 
    baseURL, 
    headers, 
    data: formBody 
  })

  return data;
}

export default handleApi;