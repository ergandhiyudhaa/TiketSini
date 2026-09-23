import { apiRequest } from '../lib/api'

export async function registerUser(payload) {
  return apiRequest('/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function loginUser(payload) {
  return apiRequest('/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function getCurrentUser() {
  return apiRequest('/me')
}

export async function logoutUser() {
  return apiRequest('/logout', {
    method: 'POST',
  })
}
