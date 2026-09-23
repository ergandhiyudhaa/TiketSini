import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../services/authService'

export const AuthContext = createContext(null)

const TOKEN_KEY = 'tiketsini_auth_token'
const USER_KEY = 'tiketsini_auth_user'

function readStoredUser() {
  try {
    const storedUser = localStorage.getItem(USER_KEY)
    return storedUser ? JSON.parse(storedUser) : null
  } catch {
    localStorage.removeItem(USER_KEY)
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function restoreSession() {
      const storedToken = localStorage.getItem(TOKEN_KEY)

      if (!storedToken) {
        if (mounted) {
          setLoading(false)
        }
        return
      }

      try {
        const response = await getCurrentUser()

        if (mounted) {
          setUser(response.user)
          localStorage.setItem(
            USER_KEY,
            JSON.stringify(response.user),
          )
        }
      } catch {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)

        if (mounted) {
          setUser(null)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    restoreSession()

    return () => {
      mounted = false
    }
  }, [])

  async function login(credentials) {
    const response = await loginUser(credentials)

    localStorage.setItem(TOKEN_KEY, response.token)
    localStorage.setItem(
      USER_KEY,
      JSON.stringify(response.user),
    )

    setUser(response.user)

    return response
  }

  async function register(payload) {
    const response = await registerUser(payload)

    localStorage.setItem(TOKEN_KEY, response.token)
    localStorage.setItem(
      USER_KEY,
      JSON.stringify(response.user),
    )

    setUser(response.user)

    return response
  }

  async function logout() {
    try {
      if (localStorage.getItem(TOKEN_KEY)) {
        await logoutUser()
      }
    } catch {
      // Clear local authentication even if API logout fails.
    } finally {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
      setUser(null)
    }
  }

  const token = localStorage.getItem(TOKEN_KEY)

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      setUser,
      isAuthenticated: Boolean(user && token),
      login,
      register,
      logout,
    }),
    [user, token, loading],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
