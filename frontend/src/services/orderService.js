import { apiRequest } from '../lib/api'

export async function getMyTickets() {
  return apiRequest('/orders')
}

export async function getOrder(orderId) {
  return apiRequest(`/orders/${orderId}`)
}
