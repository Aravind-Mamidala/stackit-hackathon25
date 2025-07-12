import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { mockAxios } from '../services/mockApi'

export interface User {
  id: number
  username: string
  email: string
  role: string
  reputation: number
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  // Set up mock API defaults
  useEffect(() => {
    // Mock API handles authentication internally
  }, [token])

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await mockAxios.get('/api/auth/me')
          // Type guard to ensure we have the right response type
          if ('user' in response.data && !('questions' in response.data)) {
            setUser(response.data.user)
          }
        } catch (error) {
          console.error('Auth check failed:', error)
          localStorage.removeItem('token')
          setToken(null)
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [token])

  const login = async (email: string, password: string) => {
    try {
      const response = await mockAxios.post('/api/auth/login', { email, password })
      // Type guard to ensure we have auth response
      if ('user' in response.data && 'token' in response.data && !('question' in response.data)) {
        const { user: userData, token: authToken } = response.data
        
        setUser(userData)
        setToken(authToken)
        localStorage.setItem('token', authToken)
      }
    } catch (error: any) {
      throw new Error(error.message || 'Login failed')
    }
  }

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await mockAxios.post('/api/auth/register', { username, email, password })
      // Type guard to ensure we have auth response
      if ('user' in response.data && 'token' in response.data && !('question' in response.data)) {
        const { user: userData, token: authToken } = response.data
        
        setUser(userData)
        setToken(authToken)
        localStorage.setItem('token', authToken)
      }
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed')
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 