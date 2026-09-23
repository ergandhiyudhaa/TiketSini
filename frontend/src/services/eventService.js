import { apiRequest } from '../lib/api'

export async function getEvents() {
  return apiRequest('/events')
}

export async function getEventBySlug(slug) {
  return apiRequest(`/events/${slug}`)
}
