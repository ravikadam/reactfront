import { addAuthToken } from './index'
import Cookies from 'js-cookie'
const tokenKey = 'token'
const localStorage = window.localStorage

// eslint-disable-line

export const SET_AUTH = data => {
  const { token } = data
  localStorage.setItem(tokenKey, JSON.stringify({ token }))
  addAuthToken()
}

export const REMOVE_AUTH = () => {
  localStorage.clear()
  Cookies.remove(tokenKey)
  addAuthToken()
}

export const GET_AUTH = () => {
  let cachedHits = Cookies.get(tokenKey)
  if (!cachedHits) {
    cachedHits = localStorage.getItem(tokenKey)
    if (cachedHits) {
      cachedHits = JSON.parse(cachedHits).token
    }
  }
  return cachedHits
}

export const isAuthenticated = () => {
  if (GET_AUTH()) {
    return true
  }
  return false
}
