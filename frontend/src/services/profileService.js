import { apiRequest } from '../lib/api'

export async function updateProfile(payload) {
  return apiRequest('/profile', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}
