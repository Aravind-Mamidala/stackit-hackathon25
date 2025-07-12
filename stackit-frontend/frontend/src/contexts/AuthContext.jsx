// @ts-nocheck
import { createContext, useContext, useState, useEffect } from 'react'
import { mockAxios } from '../services/mockApi'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token')
    if (token) {
      // Simulate checking token validity
      setTimeout(() => {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
        setLoading(false)
      }, 500)
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      const response = await mockAxios.post('/api/auth/login', { email, password })
      
      const userData = response.data.user
      const token = response.data.token
      
      // Store user data and token
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      
      setUser(userData)
      toast.success(`Welcome back, ${userData.username}!`)
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const register = async (username, email, password) => {
    try {
      setLoading(true)
      const response = await mockAxios.post('/api/auth/register', { 
        username, 
        email, 
        password 
      })
      
      const userData = response.data.user
      const token = response.data.token
      
      // Store user data and token
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      
      setUser(userData)
      toast.success(`Welcome to StackIt, ${userData.username}!`)
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    toast.success('Successfully logged out!')
  }

  const updateProfile = async (userData) => {
    try {
      const response = await mockAxios.put('/api/users/profile', userData)
      const updatedUser = response.data
      
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      
      toast.success('Profile updated successfully!')
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update profile'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const isAdmin = () => {
    return user?.role === 'admin'
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAdmin
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 