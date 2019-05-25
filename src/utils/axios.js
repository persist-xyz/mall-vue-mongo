import axios from 'axios'

axios.default.baseURI = 'http://127.0.0.1:27017/'
axios.defaults.timeout = 30000

axios.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(response => {
  // TODO add toast
  return response.data
}, err => {
  return Promise.reject(err)
})

const get = (url, data) => {
  return axios.get(url, {params: data})
}
const post = (url, data) => {
  return axios.post(url, data)
}

export default {
  get: get,
  post: post
}
