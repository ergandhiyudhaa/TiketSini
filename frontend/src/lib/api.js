const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://127.0.0.1:8000/api'

const TOKEN_KEY = 'tiketsini_auth_token'

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY)

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  let data = null

  try {
    data = await response.json()
  } catch {
    // Empty response body
  }

  if (!response.ok) {
    const error = new Error(
      data?.message || 'Something went wrong.',
    )

    error.status = response.status
    error.data = data

    throw error
  }

  return data
}

export { API_BASE_URL }
