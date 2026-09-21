import { apiRequest } from '../lib/api'

export async function getEventBySlug(slug) {
  return apiRequest(`/events/${slug}`)
}