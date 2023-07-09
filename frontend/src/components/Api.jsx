import axios from 'axios'

export function Api(){

  const http = axios.create({
    baseURL: 'http://127.0.0.1:8001/api/',
    headers:{
      'content-type': 'application/json'
    }
  })

  return(
    {http}
  )
}