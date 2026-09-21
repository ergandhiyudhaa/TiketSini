import { apiRequest } from '../lib/api'

export async function getCategories() {
  const response = await apiRequest('/categories')

  return response.data
}